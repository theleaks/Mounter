# Mounter
All users in the accounts folder and remount at the time interval you set.
# Installation
```
npm i
```
# Flags (required!)
```
--drive Rclone remote name.
--path Mounted directory.
--time User change interval(min).
```
# Run example
```
node mounter --drive Gdrive --path /mnt0 --time 60
```
