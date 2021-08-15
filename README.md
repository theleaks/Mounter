# Mounter
All users in the accounts folder and remount at the time interval you set.
# Installation
```
npm i
```

# Rclone Flags (config.txt)
```
Supports all Rclone commands.
```

# Flags (required!)
```
--drive Rclone remote name.
--path Mounted directory.
--time User change interval(min).
```
# Flags (Options!)
```
--ftime User change first time(min)
```
# Run example
```
node mounter --drive Gdrive --path /mnt0 --time 60
```
