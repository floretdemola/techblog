const commentFormHandler = async function(event){
    event.preventDefault();
    
        const comment = document.querySelector('input[name="post-id"]').value;
        const body = document.querySelector('textarea[name="comment-body"]').value;
    
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment,
                body
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
    document.location.reload();
};
    
const deleteClickHandler = async function() {
        await fetch('api/comment', {
            method: 'DELETE'
        });
    document.location.reload();
};
    
document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteClickHandler);