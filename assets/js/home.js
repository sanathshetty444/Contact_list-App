class posts{
    constructor(){
        this.outer=$('#outer');
        this.createpost();
        let self=this;
        $('#outer>div').each(function(){
            self.deletepost($(' .delete-contact-button',this));

        })

    }
    createpost(){
        let post=$('#post-submit');
        let self=this;

        post.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:"/contact",
                data:post.serialize(),
                success:function(data){
                    console.log(data);
                    let newcon=self.newcontactdom(data.data.contact);
                    $('#outer').prepend(newcon);

                }
            })
        })
    }

    newcontactdom(contact){
        return $(`<div id ="inner-${contact._id}" >
        <a class="delete-contact-button" href="/delete-contact/?id=${contact._id}" ><i class="far fa-window-close"></i></a>
        ${contact.name} <br>
        ${contact.password} 
        
     </div>
     <br>
     <br>`)
    }

    deletepost(deleteLink){
        console.log(deleteLink);
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop("href"),
                success:function(data){
                    $(`#inner-${data.data.contact}`).remove();
                    console.log("yesss");
                }

            })
        })
    }
}
new posts();