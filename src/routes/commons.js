const handleMethodNotAllowed = (req, res) => res.status(405).send({ error: 'Method no allowed' });

module.exports = {
    handleMethodNotAllowed
};