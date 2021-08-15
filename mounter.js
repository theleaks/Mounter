const os = process.platform;
const args = require('minimist')(process.argv.slice(2))
const fs = require("fs");
const kill = require('tree-kill');
const chalk = require('chalk');
const {
    exec
} = require("child_process");
const UserList = [];
var userNumber = 0;
fs.readdirSync("./accounts").forEach((file) => {
    UserList.push(file);
});
os == "win32" || os == "win64" ? console.log("Windows Dedected") : exec(`sudo fusermount -uz ${args.path}`, (err) => {
    err ? console.log("There are no pre-mounted drives.") : console.log(chalk.red.bgWhite.bold(' Killed! 🔪'))
})
const clean = (pid) => {
    // Clean .log.txt && process kill || unmount
    fs.writeFile('./log.txt', 'Cleaned. ', (err) => {
        if (err) {
            console.log(err);
        }
    })
    os == "win32" || os == "win64" ? kill(pid, (err) => {
        err ? console.log(err) : console.log(chalk.red.bgWhite.bold(' Killed! 🔪'))
    }) : exec(`sudo fusermount -uz ${args.path}`, (err) => {
        err ? console.log(err) : console.log(chalk.red.bgWhite.bold(' Killed! 🔪'))
    })
}

const readConfig = () => {
    config = fs.readFileSync("./config.txt", 'utf8')
    console.log(chalk.bgBlue.bold("\n Parameter: ") + chalk.greenBright(config));
    return config;
}
console.log(
    chalk.green.blueBright.bold(`
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
            return;
        });
    console.log(
        chalk.bgGrey.white.bold(`${args.drive && args.path && args.time ? "\n Mounted❕ ✅": chalk.bgRed("\n Mounted Failed❗️ ❌")} `),
        chalk.bold.inverse(`Drive ||${args.drive ? args.drive: chalk.bold.bgRedBright("Undefined")} >> ${args.path ? args.path: chalk.bold.bgRedBright("Undefined")}|| Time: ${ args.ftime ? args.time + " First Time " +args.ftime  : args.time} `),
        chalk.bold.yellowBright(`User${userNumber}: ${user} \n`)
    );
    setTimeout(() => {
        userNumber < UserList.length ? userNumber++ : userNumber = 0;
        args.ftime = undefined;
        clean(exe2.pid)
        setTimeout(() => {
            mounter(UserList[userNumber])
        }, 3000);
    }, args.ftime !== undefined ? args.ftime * 60 * 1000 : args.time * 60 * 1000);
}

mounter(UserList[userNumber]);