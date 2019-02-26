const checkHealth = app => {
    app.get('/health', async function(req, res) {
        console.log(`The applications is health`);
        res.status(200).send(`The applications is health`);
    });
};

export default checkHealth;
