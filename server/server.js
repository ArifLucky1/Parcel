import app from "./app.js";


app.listen(process.env.PORT, () => {
    console.log(`Serveris running on port ${process.env.PORT}`);
    
});