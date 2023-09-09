const mongoose=require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/instaClone', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
};

module.exports=connectDB;
