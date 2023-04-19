# Cron Parser

Technical task from Vertex Technologies

## To run program

```bash
  node crone-parser.js "*/15 0 1,15 * 1-5 /usr/bin/find"
```

**Note:** This program was tested in PowerShell terminal and may not work as expected in other terminals like GitBash due to differences in process.argv[2] value.

**Note:** If on the output we will see empty string '' it means that the argument is incorrect or this program do not handle such case
