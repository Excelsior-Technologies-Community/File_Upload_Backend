const cloudinary = require("../utils/cloudinary");
const File = require("../models/File");
const streamifier = require("streamifier");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        resource_type: "auto",
      },
      async (err, result) => {
        if (err) {
          console.error("Cloudinary Error:", err);
          return res.status(500).json({ message: "Cloudinary error", error: err });
        }

        const savedFile = new File({
          filename: req.file.originalname,
          url: result.secure_url,
          public_id: result.public_id,
          size: req.file.size,
          mimeType: req.file.mimetype,
        });

        await savedFile.save();

        res.json({
          message: "File uploaded successfully",
          file: savedFile,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.listFiles = async (req, res) => {
  const files = await File.find().sort({ createdAt: -1 });
  res.json(files);
};
