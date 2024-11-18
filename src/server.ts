import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

const port = config.port;
async function main() {
  try {
    await mongoose.connect(config.database_uri as string);
    console.log('database connected successfully!');
    app.listen(port, () => {
      console.log(`Server is running on port :${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
