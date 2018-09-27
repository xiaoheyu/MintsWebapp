<template>
  <div class="posts">
    <div class="row" style="background-color:lightgrey;">
      <div class="col">
        <h1>Map</h1>
          <GmapMap
              :center="{lat:31.9686,lng:-99.9018}"
              :zoom="6"
              map-type-id="roadmap"
              style="width: 1000px; height: 1000px;"
          >
       

              <!-- 
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
             

                @click="center=m.position">
                </gmap-marker> 
              -->

          
          
              <div v-for="(m, index) in markers">

                 <gmap-circle

                 :center="m.position" 
                 :radius = 10000
                 :fillColor = "m.color"
                 ></gmap-circle>
              </div>

          </GmapMap>

        <div>
          <div class='my-legend'>
            <div class='legend-title'>pm2.5 color legend (µg/m³)</div>
              <div class='legend-scale'>
                <ul class='legend-labels'>
                  <li><span style='background:#ffffff;'></span>0</li>
                  <li><span style='background:#0012ff;'></span></li>
                  <li><span style='background:#0024ff;'></span></li>
                  <li><span style='background:#0036ff;'></span></li>
                  <li><span style='background:#0047ff;'></span></li>
                  <li><span style='background:#0059ff;'></span></li>
                  <li><span style='background:#006bff;'></span></li>
                  <li><span style='background:#007dff;'></span></li>
                  <li><span style='background:#008fff;'></span></li>
                  <li><span style='background:#00a1ff;'></span></li>
                  <li><span style='background:#00b3ff;'></span>5</li>
                  <li><span style='background:#00c4ff;'></span></li>
                  <li><span style='background:#00e8ff;'></span></li>
                  <li><span style='background:#00faff;'></span></li>
                  <li><span style='background:#00fff2;'></span></li>
                  <li><span style='background:#00ffe0;'></span></li>
                  <li><span style='background:000ffcf;'></span></li>
                  <li><span style='background:#00ffbd;'></span></li>
                  <li><span style='background:#00ffab;'></span></li>
                  <li><span style='background:#00ffab;'></span></li>
                  <li><span style='background:#00ff87;'></span>10</li>
                  <li><span style='background:#00ff63;'></span></li>
                  <li><span style='background:#00ff52;'></span></li>
                  <li><span style='background:#00ff40;'></span></li>
                  <li><span style='background:#00ff2e;'></span></li>
                  <li><span style='background:#00ff1c;'></span></li>
                  <li><span style='background:#00ff00;'></span></li>
                  <li><span style='background:#1aff00;'></span></li>
                  <li><span style='background:#2bff00;'></span></li>
                  <li><span style='background:#3dff00;'></span></li>
                  <li><span style='background:#4fff00;'></span>15</li>
                  <li><span style='background:#66ff00;'></span></li>
                  <li><span style='background:#78ff00;'></span></li>
                  <li><span style='background:#8aff00;'></span></li>
                  <li><span style='background:#9cff00;'></span></li>
                  <li><span style='background:#b3ff00;'></span></li>
                  <li><span style='background:#c4ff00;'></span></li>
                  <li><span style='background:#e8ff00;'></span></li>
                  <li><span style='background:#faff00;'></span></li>
                  <li><span style='background:#fff200;'></span></li>
                  <li><span style='background:#ffe000;'></span>20</li>
                  <li><span style='background:#ffd600;'></span></li>
                  <li><span style='background:#ffcc00;'></span></li>
                  <li><span style='background:#ffc200;'></span></li>
                  <li><span style='background:#ffb800;'></span></li>
                  <li><span style='background:#ffad00;'></span></li>
                  <li><span style='background:#ffa300;'></span></li>
                  <li><span style='background:#ff9900;'></span></li>
                  <li><span style='background:#ff8f00;'></span></li>
                  <li><span style='background:#ff8500;'></span></li>
                  <li><span style='background:#ff7a00;'></span>25</li>
                  <li><span style='background:#ff7000;'></span></li>
                  <li><span style='background:#ff6600;'></span></li>
                  <li><span style='background:#ff5c00;'></span></li>
                  <li><span style='background:#ff5200;'></span></li>
                  <li><span style='background:#ff4700;'></span></li>
                  <li><span style='background:#ff3d00;'></span></li>
                  <li><span style='background:#ff2e00;'></span></li>
                  <li><span style='background:#ff1f00;'></span></li>
                  <li><span style='background:#ff0f00;'></span></li>
                  <li><span style='background:#ff0000;'></span>30</li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div>




      <div class="col" style="padding:50;">
        <h1>OpenAQ Table</h1>
        <div v-if="posts.length > 0" class="table-wrap">
          <table>
            <tr>
              <td>City</td>
              <td>UTC Time</td>
              <td width="">Value</td>
              <td width="100" align="center">Prameters</td>
            </tr>
            <tr v-for="post in posts">
              <td>{{ post.city }}</td>
              <td>{{ post.date.utc }}</td>
              <td>{{ post.value }}</td>
              <td align="center">
              {{post.parameter}}</td>
           </tr>
          </table>
        </div>
        <div v-else>
          There are no posts.. Lets add one now <br /><br />
        </div>
      </div>

    </div>
  </div>
</template>



<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'google-map',
  data () {
    return {
      posts: [],
      center:[31.9686,-99.9018],
      color:[],
     markers:[]
  

 }
 },
    
  
  mounted () {
    this.getPosts()
  },

  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      const new_markers = []
      for(var sample in response.data.post)
      {
        var lat = response.data.post[sample].coordinates.latitude;
        var lng = response.data.post[sample].coordinates.longitude;
        var coordinates = {"lat": lat, "lng":lng};
        response.data.post[sample].coordinates = coordinates;
        var color;
        if(response.data.post[sample].value <= 0.5){
          color = "#0012ff"
        }else if (response.data.post[sample].value > 0.5 && response.data.post[sample].value <=1){
          color = "#0024ff"
        }
        else if (response.data.post[sample].value > 1 && response.data.post[sample].value <=1.5){
          color = "#0036ff"
        }
         else if (response.data.post[sample].value > 1.5 && response.data.post[sample].value <=2){
          color = "#0047ff"
        }
          else if (response.data.post[sample].value > 2 && response.data.post[sample].value <=2.5){
          color = "#0059ff"
        }
           else if (response.data.post[sample].value > 2.5 && response.data.post[sample].value <=3){
          color = "#006bff"
        }
             else if (response.data.post[sample].value > 3 && response.data.post[sample].value <=3.5){
          color = "#007dff"
        }
              else if (response.data.post[sample].value > 3.5 && response.data.post[sample].value <=4){
          color = " #008fff"
        }
               else if (response.data.post[sample].value > 4 && response.data.post[sample].value <=4.5){
          color = "#00a1ff"
        }
          else if (response.data.post[sample].value > 4.5 && response.data.post[sample].value <=5){
          color = "#0024ff"
        }
          else if (response.data.post[sample].value > 1 && response.data.post[sample].value <=1.5){
          color = "#0036ff"
        }
         else if (response.data.post[sample].value > 1.5 && response.data.post[sample].value <=2){
          color = "#0047ff"
        }
          else if (response.data.post[sample].value > 2 && response.data.post[sample].value <=2.5){
          color = "#0059ff"
        }
           else if (response.data.post[sample].value > 2.5 && response.data.post[sample].value <=3){
          color = "#006bff"
        }
             else if (response.data.post[sample].value > 3 && response.data.post[sample].value <=3.5){
          color = "#007dff"
        }
              else if (response.data.post[sample].value > 3.5 && response.data.post[sample].value <=4){
          color = " #008fff"
        }
               else if (response.data.post[sample].value > 4 && response.data.post[sample].value <=4.5){
          color = "#00a1ff"
        }        else if (response.data.post[sample].value > 4.5 && response.data.post[sample].value <=5){
          color = "#00b3ff"
        }
          else if (response.data.post[sample].value > 5 && response.data.post[sample].value <=5.5){
          color = "#00c4ff"
        }
         else if (response.data.post[sample].value > 5.5 && response.data.post[sample].value <=6){
          color = "##00e8ff"
        }
          else if (response.data.post[sample].value > 6 && response.data.post[sample].value <=6.5){
          color = "#00faff"
        }
           else if (response.data.post[sample].value > 6.5 && response.data.post[sample].value <=7){
          color = "#00fff2"
        }
             else if (response.data.post[sample].value > 7 && response.data.post[sample].value <=7.5){
          color = "#00ffe0"
        }
              else if (response.data.post[sample].value > 7.5 && response.data.post[sample].value <=8){
          color = " #000ffcf"
        }
               else if (response.data.post[sample].value > 8 && response.data.post[sample].value <=8.5){
          color = "#00ffbd"
        }
                else if (response.data.post[sample].value > 8.5 && response.data.post[sample].value <=9){
          color = "#00ffab"
        }
          else if (response.data.post[sample].value > 9 && response.data.post[sample].value <=9.5){
          color = "#00ffab"
        }
         else if (response.data.post[sample].value > 9.5 && response.data.post[sample].value <=10){
          color = "#00ff87"
        }
          else if (response.data.post[sample].value > 10 && response.data.post[sample].value <=10.5){
          color = "#00ff63"
        }
           else if (response.data.post[sample].value > 10.5 && response.data.post[sample].value <=11){
          color = "#00ff52"
        }
             else if (response.data.post[sample].value > 11 && response.data.post[sample].value <=11.5){
          color = "#00ff40"
        }
              else if (response.data.post[sample].value > 11.5 && response.data.post[sample].value <=12){
          color = " #00ff2e"
        }
               else if (response.data.post[sample].value > 12 && response.data.post[sample].value <=12.5){
          color = "#00ff1c"
        }
                else if (response.data.post[sample].value > 12.5 && response.data.post[sample].value <=13){
          color = "#00ff00"
        }
          else if (response.data.post[sample].value > 13 && response.data.post[sample].value <=13.5){
          color = "#1aff00"
        }
         else if (response.data.post[sample].value > 13.5 && response.data.post[sample].value <=14){
          color = "#2bff00"
        }
          else if (response.data.post[sample].value > 14 && response.data.post[sample].value <=14.5){
          color = "#3dff00"
        }
           else if (response.data.post[sample].value > 14.5 && response.data.post[sample].value <=15){
          color = "#4fff00"
        }
             else if (response.data.post[sample].value > 15 && response.data.post[sample].value <=15.5){
          color = "#66ff00"
        }
              else if (response.data.post[sample].value > 15.5 && response.data.post[sample].value <=16){
          color = " #78ff00"
        }
               else if (response.data.post[sample].value > 16 && response.data.post[sample].value <=16.5){
          color = "#8aff00"
        }
                else if (response.data.post[sample].value > 16.5 && response.data.post[sample].value <=17){
          color = "#9cff00"
        }
          else if (response.data.post[sample].value > 17 && response.data.post[sample].value <=17.5){
          color = "#b3ff00"
        }
         else if (response.data.post[sample].value > 17.5 && response.data.post[sample].value <=18){
          color = "#c4ff00"
        }
          else if (response.data.post[sample].value > 18 && response.data.post[sample].value <=18.5){
          color = "#e8ff00"
        }
           else if (response.data.post[sample].value > 18.5 && response.data.post[sample].value <=19){
          color = "#faff00"
        }
             else if (response.data.post[sample].value >19 && response.data.post[sample].value <=19.5){
          color = "#fff200"
        }
              else if (response.data.post[sample].value > 19.5 && response.data.post[sample].value <=20){
          color = " #ffe000"
        }
               else if (response.data.post[sample].value > 20 && response.data.post[sample].value <=20.5){
          color = "#ffd600"
        }
             else if (response.data.post[sample].value > 20.5 && response.data.post[sample].value <=21){
          color = "#ffcc00"
        }
              else if (response.data.post[sample].value > 21 && response.data.post[sample].value <=21.5){
          color = " #ffc200"
        }
               else if (response.data.post[sample].value > 21.5 && response.data.post[sample].value <=22){
          color = "#ffb800"
        }          
                else if (response.data.post[sample].value > 22 && response.data.post[sample].value <=22.5){
          color = "#ffad00"
        }
                 else if (response.data.post[sample].value > 22.5 && response.data.post[sample].value <=23){
          color = "#ffa300"
        }
                else if (response.data.post[sample].value > 23 && response.data.post[sample].value <=23.5){
          color = "#ff9900"
        }
          else if (response.data.post[sample].value > 23.5 && response.data.post[sample].value <=24){
          color = "#ff8f00"
        }
         else if (response.data.post[sample].value > 24 && response.data.post[sample].value <=24.5){
          color = "#ff8500"
        }
          else if (response.data.post[sample].value > 24.5 && response.data.post[sample].value <=25){
          color = "#ff7a00"
        }
           else if (response.data.post[sample].value > 25 && response.data.post[sample].value <=25.5){
          color = "#ff7000"
        }
             else if (response.data.post[sample].value > 25.5 && response.data.post[sample].value <=26){
          color = "#ff6600"
        }
              else if (response.data.post[sample].value > 26 && response.data.post[sample].value <=26.5){
          color = " #ff5c00"
        }
               else if (response.data.post[sample].value > 26.5 && response.data.post[sample].value <=27){
          color = "#ff5200"
        }
            else if (response.data.post[sample].value > 27 && response.data.post[sample].value <=27.5){
          color = "#ff4700"
        }
                else if (response.data.post[sample].value > 27.5 && response.data.post[sample].value <=28){
          color = "#ff3d00"
        }
          else if (response.data.post[sample].value > 28 && response.data.post[sample].value <=28.5){
          color = "#ff2e00"
        }
         else if (response.data.post[sample].value > 28.5 & response.data.post[sample].value <=29){
          color = "#ff1f00"
        }
          else if (response.data.post[sample].value > 29 && response.data.post[sample].value <=29.5){
          color = "#ff0f00"
        }
           else {
          color = "#ff0000"
        }
      
        var temp = {"position": coordinates, "value": response.data.post[sample].value, "color": color}
      new_markers.push(temp);
        console.log(response.data.post[sample])
      }
      this.posts = response.data.post
      //console.log(response.data.post)
      //console.log(new_markers)
  this.markers = new_markers;
      console.log(this.markers);

    }


    
}
}

</script>

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}


 .my-legend .legend-title {
    text-align: left;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 90%;
    }
  .my-legend .legend-scale ul {
    margin: 0;
    padding: 0;
    float: left;
    list-style: none;
    }
  .my-legend .legend-scale ul li {
    display: block;
    float: left;
    width: 6px;
    margin-bottom: 6px;
    text-align: center;
    font-size: 80%;
    list-style: none;
    }
  .my-legend ul.legend-labels li span {
    display: block;
    float: left;
    height: 15px;
    width: 12px;
    }
  .my-legend .legend-source {
    font-size: 70%;
    color: #999;
    clear: both;
    }
  .my-legend a {
    color: #777;
    }

</style>
