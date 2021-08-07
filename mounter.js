const os = process.platform;
const args = require('minimist')(process.argv.slice(2))
const fs = require("fs");
var kill = require('tree-kill');
const chalk = require('chalk');
const {
    exec
} = require("child_process");
const UserList = [];
var userNumber = 0;
fs.readdirSync("./accounts").forEach((file) => {
    UserList.push(file);
});
var config = "";
const readConfig = () => {
    config = fs.readFileSync("./config.txt", 'utf8')
    console.log(chalk.bgBlue.bold("\n Parameter: ") + chalk.greenBright(config));
    return config;
}
console.log(chalk.green.blueBright.bold(`
MM    MM                        tt                  
MMM  MMM  oooo  uu   uu nn nnn  tt      eee  rr rr  
MM MM MM oo  oo uu   uu nnn  nn tttt  ee   e rrr  r 
MM    MM oo  oo uu   uu nn   nn tt    eeeee  rr     
MM    MM  oooo   uuuu u nn   nn  tttt  eeeee rr                                                                                                                                                 
`))
const mounter = (user) => {
    const exe2 = exec(
        `rclone mount "${args.drive}:" "${args.path}" ${readConfig()} --drive-service-account-file ./accounts/${user}`,
        (error, stdout, stderr) => {
            if (error) {
                console.log(chalk.red.bgWhite.bold(' Unmounted!'));
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            return;
        });
    console.log(chalk.bgGrey.white.bold(`\n Mounted! ✅ `), chalk.bold.yellowBright(`User: ${user} \n`));
    setTimeout(() => {
        userNumber < UserList.length ? userNumber++ : userNumber = 0;
        kill(exe2.pid)
        console.log(chalk.red.bgWhite.bold(' Killed! 🔪'));
        os == "win32" || os == "win64" ? null : exec(`sudo fusermount -uz ${args.path}`);
        setTimeout(() => {
            mounter(UserList[userNumber]);
        }, 3000);
    }, args.time * 60 * 1000);
}


mounter(UserList[userNumber]);