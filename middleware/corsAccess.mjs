
const corsAccess = (req, res, next) => {
res.header('Access-Control-Allow-Origin', '*')
res.header('Access-Control-Allow-Headers', '*')

if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'DELETE', 'GET')
    return res.status(200).json({});
}
next();
}

export default corsAccess