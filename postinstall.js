const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ncp = require('ncp').ncp; // Dùng ncp để sao chép thư mục và file

// Tắt kiểm tra đối với ncp (copy thư mục lớn)
ncp.limit = 16;

async function askUser() {
  const response = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'addFolder',
      message: 'Do you want to add the "data_tests" folder to the root of your project?',
      default: true,
    },
  ]);

  if (response.addFolder) {
    const sourceFolder = path.join(__dirname, 'data_tests');
    const destinationFolder = path.join(process.cwd(), 'data_tests');

    if (!fs.existsSync(destinationFolder)) {
      // Sao chép thư mục 'data_tests' từ thư viện vào dự án của người dùng
      ncp(sourceFolder, destinationFolder, function (err) {
        if (err) {
          console.error('Error copying folder:', err);
        } else {
          console.log('Folder "data_tests" has been copied to your project!');
        }
      });
    } else {
      console.log('Folder "data_tests" already exists.');
    }
  } else {
    console.log('No folder was added.');
  }
}

askUser().catch((err) => console.error('Error:', err));
