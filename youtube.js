// function onYouTubeIframeAPIReady() {
//     funcChain();
// }
// function funcChain(){
//     queueMicrotask(()=>console.log("done"));
//     playThisVid;
// }

const player = document.getElementById("player");
// console.log(player);
const currentUrl = window.location.href;
// console.log(currentUrl);
player.style.border = "none";

let arr = currentUrl.split('@');
const vid_id = ""+arr[1];
// console.log(vid_id);
// `<iframe width="560" height="315" src="https://www.youtube.com/embed/mqfTcT56DhY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`


function playThisVid(){
    // player.innerHTML = `
    // <iframe src= title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    // `
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${String(vid_id)}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.title = "YouTube video player"
    iframe.allowFullscreen = "true";
    player.appendChild(iframe)

}

function formatNumber(num, precision = 2) {
    const map = [
      { suffix: 'T', threshold: 1e12 },
      { suffix: 'B', threshold: 1e9 },
      { suffix: 'M', threshold: 1e6 },
      { suffix: 'K', threshold: 1e3 },
      { suffix: '', threshold: 1 },
    ];
  
    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
      const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
  
      return formatted;
    }
  
    return num;
  }
// queueMicrotask();
playThisVid();

const video_title = document.getElementById("title-stat");
// const vid_stat = document.getElementById("desc-channel");

const apiKey = `AIzaSyAZdnIKGBcCPitlE2NMYX1fqURJ5wFOgEQ`;
async function fixVideo() {
    // video_title.innerHTML = 
    let response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${vid_id}&key=${apiKey}`);
    let data = await response.json();
    let vid  = data.items[0];
    // console.log(data, vid);
    getChanelIcon(vid);
}
async function getChanelIcon(video_info){
  const chanels_url = 'https://www.googleapis.com/youtube/v3/channels?'
  let response = await fetch(chanels_url + new URLSearchParams({
      key: apiKey,
      part: ['snippet','statistics','contentDetails'],
      id: video_info.snippet.channelId
  }));
  let data = await response.json();
  let reqData = data.items[0];

  video_info.channel_Subscriber = data.items[0].statistics.subscriberCount;
  video_info.channel_Thumbnail = data.items[0].snippet.thumbnails.default.url;
  displayInfo(video_info);
}
const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?`;
async function fetchComment(){
    let response = await fetch(comment_url + new URLSearchParams({
        part: 'snippet',
        videoId: vid_id,
        maxResults: 80,
        order: 'time',
        key: apiKey
    }));
    let data = await response.json();
    console.log(data);
    for (let i = 0; i < data.items.length; i++) {
        const element = data.items[i];
        // console.log(element);
        makeComments(element);
    }
}
fetchComment();
const comment_container = document.getElementById("comment-container");
function makeComments(comments){
    let comment = document.createElement("div");
    comment.className = "comment";
    let comment_str = `
        <div class="user-logo">
            <img src="${comments.snippet.topLevelComment.snippet.authorProfileImageUrl}" alt="">
        </div>
        <div class="comment-ifno">
            <div class="top">
                <div class="username">${comments.snippet.topLevelComment.snippet.authorDisplayName}</div>
                <div class="time">${makeDate(comments.snippet.topLevelComment.snippet.updatedAt)}</div>
            </div>
            <div class="act-Comment">
                ${comments.snippet.topLevelComment.snippet.textDisplay}
            </div>
            <div class="like-dislike-reply">
                <div style=" padding-right: 5px; border-right: 1px solid #000000;" class="stat-items">
                    <div class="img">
                        <img src="Youtube/Button-Btn.png" alt="">
                    </div>
                    <div class="like">${formatNumber(comments.snippet.topLevelComment.snippet.likeCount)}</div>
                </div>

                <div style="margin-left: 10px;" class="stat-items">                        
                    <div class="img">
                            <img src="Youtube/Button-Btn-1.png" alt="">
                    </div>
                </div>
                <div>
                    Reply
                </div>
               
            </div>
            <div class="reply">
                <div class="show-more">
                    <img class="img" src="Sidebar/arrowBottom.png" alt="show-more">
                    <div class="side-bar-menu-items-title">Show ${comments.snippet.totalReplyCount} More</div>
                    
                </div>
            </div>
        </div>`;
        comment.innerHTML = comment_str;
        comment_container.appendChild(comment);

}

function makeDate(date){
    // console.log(typeof date);
    let compactDate = date.split("T");
    let shortDate = compactDate[0];
    let newDate = shortDate.split("-");
    let day = ""+newDate[2];
    let month = ""+newDate[1];
    let year = ""+newDate[0];
    
    const stringdate = day+"-"+month+"-"+year;;
    return stringdate;
  }
fixVideo();



function displayInfo(vid){
    video_title.innerHTML=`
    <div class="title">
                ${vid.snippet.title}
            </div>
            <div class="stat">
                <div class="left-stat">
                    <div>${formatNumber(vid.statistics.viewCount)}</div>
                    <div> ${makeDate(vid.snippet.publishedAt)}</div>
                </div>
                <div class="like-dislike">
                    <div style=" padding-right: 5px; border-right: 1px solid #000000;" class="stat-items">
                        <div class="img">
                            <img src="Youtube/Button-Btn.png" alt="">
                        </div>
                        <div class="like">${formatNumber(vid.statistics.likeCount)}</div>
                    </div>

                    <div style="margin-left: 10px;" class="stat-items">                        
                        <div class="img">
                                <img src="Youtube/Button-Btn-1.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="img">
                        <img src="Youtube/Button-Btn-2.png" alt="">
                    </div>
                    <div>Save</div>
                </div>
                <div class="stat-item">
                    <div class="img">
                        <img src="Youtube/Button-Btn-3.png" alt="">
                    </div>
                    <div>Share</div>
                </div>
                <div class="stat-item">
                    <div class="img">
                        <img src="Youtube/Button-Btn-4.png" alt="">
                    </div>
                </div>
            </div>
            <div id="desc-channel" class="desc-channel">
                <div style="display: flex; justify-content: space-between; margin: 20px 0px;" class="ch-subs">
                    <div style="display: flex;">
                        <div><img style="width: 30px; height: 30px; border-radius: 50%; margin-right: 1rem;" src="${vid.channel_Thumbnail}" alt=""></div>
                        <div>
                            <div>${vid.snippet.channelTitle}</div>
                            <div>${formatNumber(vid.channel_Subscriber)} Subscribers</div>
                        </div>
                    </div>
                    <div style="padding: 5px 25px; background-color: red; color: white; border-radius: 5px; display: flex; align-items:center ;">Subscribe</div>
                </div>
            <div id="desc-channel" class="desc-channel">
                <div class="desc">
                    ${vid.snippet.description}
                </div>
            </div>`;
}


// fetchSuggested();
