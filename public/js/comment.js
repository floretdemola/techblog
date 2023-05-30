const commentFormHandler = async function(event){
    event.preventDefault();
    
        const user_id = document.querySelector('input[name="post-id"]').value;
        const content = document.querySelector('textarea[name="comment-body"]').value;
    
        await fetch(`/api/comment/${user_id}`, {
            method: 'POST',
            body: JSON.stringify({
                user_id,
                content,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
      document.location.reload();
};
    
const deleteClickHandler = async function() {
        await fetch('/api/comment', {
            method: 'DELETE'
        });
    document.location.reload();
};
    
document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteClickHandler);