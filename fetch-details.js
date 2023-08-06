const apiKey = `AIzaSyBM1_C40cespNthMdFZHgn6-6VwZ8X4mlo`;
const video_suggestion_url = `https://www.googleapis.com/youtube/v3/videos?`;
const chanels_url = 'https://www.googleapis.com/youtube/v3/channels?'

async function fetchSuggested(){
    let response = await fetch(video_suggestion_url + new URLSearchParams({
        key : apiKey,
        part: ['snippet','contentDetails','statistics'],
        chart: 'mostPopular',
        maxResults: 50,
        regionCode: 'In'
    }));
    let video_suggestions = await response.json(); 
    console.log(video_suggestions);
    for (const i in video_suggestions.items) {
        getChanelIcon(video_suggestions.items[i]);
    }
        // for (let i = 0; i < video_suggestions.length; i++) {
        //     const element = video_suggestions[i];
        //     console.log(element);
        // }
}
fetchSuggested();
async function getChanelIcon(video_info){
    console.log(video_info);
    let response = await fetch(chanels_url + new URLSearchParams({
        key: apiKey,
        part: 'snippet',
        id: video_info.snippet.channelId
    }));
    let data = await response.json();
    video_info.channel_Thumbnail = data.items[0].snippet.thumbnails.default.url;
    makeVideos(video_info);
    
}
// fetchSuggested();
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
  function makeDate(date){
    console.log(typeof date);
    let compactDate = date.split("T");
    let shortDate = compactDate[0];
    let newDate = shortDate.split("-");
    let day = ""+newDate[2];
    let month = ""+newDate[1];
    let year = ""+newDate[0];
    
    const stringdate = day+"-"+month+"-"+year;;
    return stringdate;
  }
  
  function makeVideos(video_info){
      console.log(video_info);
      const video_cards = document.createElement("div");
      let count = formatNumber(video_info.statistics.viewCount);
      // const date = makeDate();
      
      video_cards.className = "videos";
      let my_str = `<a id="${video_info.id}" href="youtube.html?vid_id=@${video_info.id}">
      <div class="thumbnail"><img style="border-radius:25px;" src="${video_info.snippet.thumbnails.high.url}" alt="thumbnail"></div>
      <div class="title-chanel">
      <div class="chanel-logo"><img src="${video_info.channel_Thumbnail}" alt="chanel-logo"></div>
      <div class="video-title">${video_info.snippet.title}</div>
      </div>
      <div class="chanel-stat">
      <div class="chanel-name">${video_info.snippet.channelTitle}</div>
      <div>
      <span class="view-count">${count} |</span>
      <span class="published">${makeDate(video_info.snippet.publishedAt)}</span>
      </div>
      </div>
      </a>`
      video_cards.innerHTML = my_str;
      video_container.appendChild(video_cards);
    }
    
    
    // const video_items = video_container.getElementsByClassName("videos");
    // // for (let i = 0; i < video_items.length; i++) {
        
    // // }
    // video_items.forEach(element => {
    //     element.addEventListener("click", playVideo(element));
        
    // });
    // const element = video_items[i];
