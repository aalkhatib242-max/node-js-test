const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

const User=mongoose.model("User",userSchema)

module.exports=User

//  <% for( let art of AllArticles:) { %>
// <%=art.body %>
// <% } %>
// <%= art.title%>