var Discord = require("discord.js");
var fetch = require("node-fetch");
var xml2js = require('xml2js')
var parser = new xml2js.Parser();
var client = new Discord.Client();

var baseURL = "https://rule34.xxx/"

client.on("ready", () => {
    console.log("Ready for some uwus");
    console.log("also name is " + client.user.tag);
})

client.on("message", msg => {
    var args = msg.content.split(" ")
    args.shift()
    var ext = "";
    if(args.length != 0){
        ext = "&tags="
        for(arg in args){
            ext = ext + args[arg] + "%20"
        }

    }
    
    url = baseURL + "index.php?page=dapi&s=post&q=index&limit=100" + ext
    if(msg.content.startsWith("!hentai")){
        fetch(url) 
            .then(res => res.text())
            .then(text => {
                parser.parseString(text, function (err, result) {
                   
                    try{
                        var posts = result.posts.post
                        var post = posts[Math.floor(Math.random()*posts.length)].$
                        console.log(post)
                        var embed = new Discord.RichEmbed()
                            .setColor("#88ff88")
                            .setImage(post.file_url)
                            .setAuthor("Here you degenerate")
                            .setTitle("Sauce")
                            .addField("Tags", post.tags)
                            .setImage(post.file_url)
                            .setURL("https://rule34.xxx/index.php?page=post&s=view&id=" + post.id)
                        msg.channel.send(embed);
                    } catch {   
                         msg.reply("Nothing Found");
                    }          
                });
            })
    }
    
})

client.login("no")