#!/usr/bin/env bash

function get_ssm_parameter() {
    SSM_VALUE=`aws ssm get-parameters --with-decryption --names "${1}"  --query 'Parameters[*].Value' --output text`
    echo "${SSM_VALUE}"

}

usage="Usage: $(basename "$0") region environment 
where:
  region       - the AWS region
  stack-name   - AWS Environment (dev,test,prod)
  image-url
  slice-name   - git branch
  
"

if [ "$1" == "-h" ] || [ "$1" == "--help" ] || [ "$1" == "help" ] || [ "$1" == "usage" ] ; then
  echo "$usage"
  exit -1
fi

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] ; then
  echo "$usage"
  exit -1
fi
set -eo pipefail
# region=ap-southeast-2
region=$1
stack_name=$(echo "$2-SPACENOW-${4:-master}" | tr '[:lower:]' '[:upper:]')
HostedZoneName=$(echo "$2.cloud.spacenow.com" | tr '[:upper:]' '[:lower:]')

# get ssm parameters from env
echo "Getting SSM Parameters "

DB_USERNAME=$(get_ssm_parameter /$2/SPACENOW/DATABASE_USER )
DB_PASSWORD=$(get_ssm_parameter /rds/spacenow/mysql/MasterUserPassword) 
DB_ENDPOINT=$(get_ssm_parameter /$2/SPACENOW/DATABASE_ENDPOINT)
GOOGLE_TRACKING_ID=$(get_ssm_parameter /$2/SPACENOW/GOOGLE_TRACKING_ID)
FIXER_API_ACCESS_KEY=$(get_ssm_parameter /$2/SPACENOW/FIXER_API_ACCESS_KEY)
PAYPAL_APP_EMAIL=$(get_ssm_parameter /$2/SPACENOW/PAYPAL_APP_EMAIL)
PAYPAL_APP_CLIENT_ID=$(get_ssm_parameter /$2/SPACENOW/PAYPAL_APP_CLIENT_ID)
PAYPAL_APP_SECRET=$(get_ssm_parameter /$2/SPACENOW/PAYPAL_APP_SECRET)
BRAINTREE_APP_EMAIL=$(get_ssm_parameter /$2/SPACENOW/BRAINTREE_APP_EMAIL)
BRAINTREE_MERCHANT_ID=$(get_ssm_parameter /$2/SPACENOW/BRAINTREE_MERCHANT_ID)
BRAINTREE_PUBLIC_KEY=$(get_ssm_parameter /$2/SPACENOW/BRAINTREE_PUBLIC_KEY)
BRAINTREE_PRIVATE_KEY=$(get_ssm_parameter /$2/SPACENOW/BRAINTREE_PRIVATE_KEY)
MAILCHIMP_API=$(get_ssm_parameter /$2/SPACENOW/MAILCHIMP_API)
MAILCHIMP_LIST_ID=$(get_ssm_parameter /$2/SPACENOW/MAILCHIMP_LIST_ID)
MAILCHIMP_API_KEY=$(get_ssm_parameter /$2/SPACENOW/MAILCHIMP_API_KEY)
SMTP_LOGIN_PASSWORD=$(get_ssm_parameter /$2/SPACENOW/SMTP_LOGIN_PASSWORD)
JWT_SECRET=$(get_ssm_parameter /$2/SPACENOW/JWT_SECRET)
FACEBOOK_APP_ID=$(get_ssm_parameter /$2/SPACENOW/FACEBOOK_APP_ID)
FACEBOOK_APP_SECRET=$(get_ssm_parameter /$2/SPACENOW/FACEBOOK_APP_SECRET)
GOOGLE_CLIENT_ID=$(get_ssm_parameter /$2/SPACENOW/GOOGLE_CLIENT_ID)
GOOGLE_CLIENT_SECRET=$(get_ssm_parameter /$2/SPACENOW/GOOGLE_CLIENT_SECRET)
ACM_CERTIFICATE=$(get_ssm_parameter /$2/ACM_CERTIFICATE)
echo "ENV ${2}"
CF_PARAMS="ParameterKey=ImageUrl,ParameterValue=$3 \
          ParameterKey=ContainerPort,ParameterValue=3000 \
          ParameterKey=StackName,ParameterValue=$2 \
          ParameterKey=SliceName,ParameterValue=$4 \
          ParameterKey=DbUser,ParameterValue=$DB_USERNAME \
          ParameterKey=DbPassword,ParameterValue=$DB_PASSWORD \
          ParameterKey=DbEndpoint,ParameterValue=$DB_ENDPOINT \
          ParameterKey=GoogleTrackingId,ParameterValue=$GOOGLE_TRACKING_ID \
          ParameterKey=GoogleMapApi,ParameterValue=$GOOGLE_MAP_API \
          ParameterKey=FixerApiAccessKey,ParameterValue=$FIXER_API_ACCESS_KEY \
          ParameterKey=PaypalAppEmail,ParameterValue=$PAYPAL_APP_EMAIL \
          ParameterKey=PaypalAppClientId,ParameterValue=$PAYPAL_APP_CLIENT_ID \
          ParameterKey=PaypalAppSecret,ParameterValue=$PAYPAL_APP_SECRET \
          ParameterKey=BraintreeAppEmail,ParameterValue=$BRAINTREE_APP_EMAIL \
          ParameterKey=BraintreeMerchantId,ParameterValue=$BRAINTREE_MERCHANT_ID \
          ParameterKey=BraintreePublicKey,ParameterValue=$BRAINTREE_PUBLIC_KEY \
          ParameterKey=BraintreePrivateKey,ParameterValue=$BRAINTREE_PRIVATE_KEY \
          ParameterKey=MailChimpApi,ParameterValue=$MAILCHIMP_API \
          ParameterKey=MailChimpListId,ParameterValue=$MAILCHIMP_LIST_ID \
          ParameterKey=MailChimpApiKey,ParameterValue=$MAILCHIMP_API_KEY \
          ParameterKey=SmtpLoginPassword,ParameterValue=$SMTP_LOGIN_PASSWORD \
          ParameterKey=JwtSecret,ParameterValue=$JWT_SECRET \
          ParameterKey=FacebookAppId,ParameterValue=$FACEBOOK_APP_ID \
          ParameterKey=FacebookAppSecret,ParameterValue=$FACEBOOK_APP_SECRET \
          ParameterKey=GoogleClientId,ParameterValue=$GOOGLE_CLIENT_ID \
          ParameterKey=GoogleClientSecret,ParameterValue=$GOOGLE_CLIENT_SECRET \
          ParameterKey=Certificate,ParameterValue=$ACM_CERTIFICATE \
          ParameterKey=HostedZoneName,ParameterValue=$HostedZoneName"
echo "Checking if stack exists ..."
if ! aws cloudformation describe-stacks --region $region --stack-name $stack_name ; then

echo -e "\nStack does not exist, creating ..."
  aws cloudformation create-stack \
    --region $region \
    --stack-name $stack_name \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --template-body file:///$PWD/scripts/spacenow-cf.yml \
    --parameters $CF_PARAMS \
                  
                 

echo "Waiting for stack to be created ..."
  aws cloudformation wait stack-create-complete \
    --region $region \
    --stack-name $stack_name 
else
echo -e "\nStack exists, attempting update ..."

  set +e
  update_output=$( aws cloudformation update-stack \
    --region $region \
    --stack-name $stack_name \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --template-body=file:///$PWD/scripts/spacenow-cf.yml \
    --parameters $CF_PARAMS  2>&1)
  status=$?
  set -e

  echo "$update_output"

  if [ $status -ne 0 ] ; then

    # Don't fail for no-op update
    if [[ $update_output == *"ValidationError"* && $update_output == *"No updates"* ]] ; then
      echo -e "\nFinished create/update - no updates to be performed"
      exit 0
    else
      exit $status
    fi

  fi

  echo "Waiting for stack update to complete ..."
  aws cloudformation wait stack-update-complete \
    --region $region \
    --stack-name $stack_name \

fi

echo "Finished create/update successfully!"



