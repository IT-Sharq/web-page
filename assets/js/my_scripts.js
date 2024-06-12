const getDate = () => {
  const currentDate = new Date();
  console.log('date');
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, '0')}.${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${currentDate.getFullYear()}`;

  return formattedDate;
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const currentLocation = window.location;
    const protocol = currentLocation.protocol; // Это вернет "https:"
    const domain = currentLocation.hostname; // Это вернет домен, например, "example.com"

    const api = protocol + '//' + domain + '/api/';
    // const api = 'http://localhost:5000/api/';

    const data_today = document.getElementById('data_today');
    data_today?.append(getDate());

    const createPostsTemplate = ({ createdAt, id, name, photo, text }) => {
      const shortText = text?.substring(0, 180) || '';

      const htmlToAdd = `
      <div class="col-md-4 post_k">
      <div class="service-item">
        <img src="assets/images/post_images/${photo}" alt="phot" />
        <div class="down-content">
        <span class="date-post">${createdAt}</span>
          <h4 class="post_name"> <a href='onepost?idPost=${id}'>${name}</a> </h4>
          <p>
            ${shortText}<a href='onepost?idPost=${id}'>...</a>
          </p>
          <a href="onepost?idPost=${id}" class="filled-button">ЧИТАТЬ ДАЛЕЕ</a>
        </div>
      </div>
    </div>`;
      return htmlToAdd;
    };
    const getThreePosts = async () => {
      const resPosts = await fetch(api + 'posts/getThree');
      const threePosts = await resPosts.json();
      const posts_rows = document.getElementById('posts-row');

      threePosts.forEach((obj, index) => {
        posts_rows?.insertAdjacentHTML('beforeend', createPostsTemplate(obj));
      });
    };

    const getAllPosts = async () => {
      const posts_rows = document.getElementById('posts-all');
      const resPosts = await fetch(api + 'posts/getAll');
      const allPost = await resPosts.json();

      allPost.forEach((obj, index) => {
        posts_rows?.insertAdjacentHTML('beforeend', createPostsTemplate(obj));
      });
    };

    const getOnePost = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const idPost = searchParams.get('idPost');
        const posts_one = document.getElementById('one-post');
        const post = await fetch(api + `posts/getOnePost?idPost=${idPost}`);
        const postJson = await post.json();
        if (!postJson) return;
        const { id, createdAt, name, photo, text } = postJson;
        const htmlToAdd = `
        <div class="service-item">
          <img src="assets/images/post_images/${photo}" alt="phot" />
          <div class="down-content">
          <span class="date-post">12.09.2023</span>
            <h4 class="post_name"> <a href='onepost?idPost=${id}'>${name}</a> </h4>
            <p>
              ${text}
            </p>
         
          </div>
        </div>
      `;

        posts_one?.insertAdjacentHTML('beforeend', htmlToAdd);
      } catch (error) {
        console.log(error);
      }
    };
    getOnePost();
    getAllPosts();
    getThreePosts();
  } catch (error) {
    console.log(error);
  }
});
