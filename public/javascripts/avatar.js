function openTab(tabName) {
  var i, x;
  x = document.getElementsByClassName("containerTab");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

$(document).ready(function()
{
    $("#postAvatar").click(function()
    {
        var myobj = {Name:$("#name").val(),URL:$("#avatar_url").val(), User:$("#username").val(), Votes:'0'};
        jobj = JSON.stringify(myobj);
        //$("#json").text(jobj);
        
        var url = "avatar";
        $.ajax({
            url:url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data,textStatus) 
            {
                var everything = "The avatar '" + $("#avatar_url").val() + "' by " + $("#name").val() + " was added with as status of " + textStatus + ".";
                console.log(everything);
            }
        })
    });
    
    $("#getAvatars").click(function() 
    {
        $.getJSON('avatar', function(data) 
        {
            console.log(data);
            var everything = "<div class='container'>";
            for(var avatar in data) 
            {
                var av = "";
                av = data[avatar];
                var url = "https://images-na.ssl-images-amazon.com/images/I/514qFL2mO4L._UX385_.jpg";
                console.log(av);
                if(av.Name != "")
                {
                    if(av.URL != "")
                        url = av.URL;
                    console.log(url);
                    everything += "<div class='a_comment'><div class='inner_div'><table><tr><td><b><span id='" + av.User + "' onClick='getComments(id)'>" + av.Name + "<span></b></td></tr><tr><td><span class='plus_minus' onClick='add(id)'>+</span><img class='avatar_img' src='" + url + "'/><span class='plus_minus' onClick='add()'>-</span></td></tr></table></div></div>";
                }
            }
            everything += "</div>"
            $("#avatars").html(everything);
        })
    })
    
    $("#deleteAvatar").click(function()
    {
        $.getJSON('delete?q='+$("#query").val(), function()
        {
            console.log("collection cleared");
        });
    });
    
    $("#queryComments").click(function() {
        $.getJSON('query?q='+$("#query").val(), function(data) 
        {
            console.log(data);
            var everything = "<div class='container'>";
            for(var comment in data) 
            {
                var com = "";
                com = data[comment];
                if(com.Name != "" && com.Comment != "")
                    everything += "<div class='a_comment'><div class='inner_div'><table><tr><td><b>" + com.Name + "</b></td></tr><tr><td>" + com.Comment + ".</td></tr></table></div></div>";
            }
            everything += "</div>"
            $("#avatars").html(everything);
        })
    })
});

function getComments(id)
{
     $.getJSON('query?q='+id, function(data) 
        {
            console.log(data);
            if(data['Comments'] == undefined)
                return;
            var everything = "<div class='container'>";
            
            for(var comment in data['Comments']) 
            {
                everything += "<div class='a_comment'><div class='inner_div'><table><tr><td>" + comment + ".</td></tr></table></div></div>";
            }
            everything += "</div>"
            $("#avatar_comments").html(everything);
        })
}