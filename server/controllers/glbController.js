const glbmodel = require('../db/models/glbmodel');
const {success_function, error_function} = require('../utils/response-Handler');

exports.uploadGlb = async (req, res) => {
    try {
        const { name, description } = req.body;
        const file = req.file.path;
        if (!file) {
            let response = error_function({
                message: "File not found",
                statusCode: 400,
            });
            return res.status(response.statusCode).send(response);
        }

        const glbData = new glbmodel({
            name,
            description,
            file
        });

        await glbData.save();
        let response = success_function({
            message: "File uploaded successfully",
            statusCode: 200,
        });
       return res.status(response.statusCode).send(response);

    } catch (error) {
        console.error("Error uploading file:", error);
        let response = error_function({
            message: "Error uploading file",
            statusCode: 500,
        });
        return res.status(response.statusCode).send(response);
    }
}


exports.getGlb = async (req, res) => {
    try {
        const glbData = await glbmodel.find();
        if (!glbData) {
            let response = error_function({
                message: "No files found",
                statusCode: 404,
            });
            return res.status(response.statusCode).send(response);
        }
        let response = success_function({
            message: "Files retrieved successfully",
            data: glbData,
            statusCode: 200,
        });
        return res.status(response.statusCode).send(response);
    } catch (error) {
        console.error("Error retrieving files:", error);
        let response = error_function({
            message: "Error retrieving files",
            statusCode: 500,
        });
        return res.status(response.statusCode).send(response);
    }
}
