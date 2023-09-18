module.exports = {
  apps : [{
    name   : "LearnerView",
    script : "node_modules/next/dist/bin/next",
    args: "start -p 4056",
    //cwd: "."
    instances: "1",
    exec_mode: "cluster"
  }]
}
