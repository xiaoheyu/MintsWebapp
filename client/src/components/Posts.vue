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
                  <li><span style='background:#BC8F8F;'></span><=6</li>
                  <li><span style='background:#FFFF00;'></span>(6-9]</li>
                  <li><span style='background:#d6bb2f;'></span>(9-12]</li>
                  <li><span style='background:#FFA500;'></span>(12-15]</li>
                  <li><span style='background:#FF4500;'></span>(15-18]</li>
                  <li><span style='background:#FF0000;'></span>(18-21]</li>
                  <li><span style='background:#8B0000;'></span>(21-24]</li>
                  <li><span style='background:#6A5ACD;'></span>(24-27]</li>
                  <li><span style='background:#483D8B;'></span>(27-30]</li>
                  <li><span style='background:#191970;'></span>>30</li>
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
        if(response.data.post[sample].value <= 6){
          color = "#BC8F8F"
        }else if (response.data.post[sample].value > 6 && response.data.post[sample].value <=9){
          color = "#FFFF00"
        }
        else if (response.data.post[sample].value > 9 && response.data.post[sample].value <=12){
          color = "#d6bb2f"
        }
         else if (response.data.post[sample].value > 12 && response.data.post[sample].value <=15){
          color = " #FFA500"
        }
          else if (response.data.post[sample].value > 15 && response.data.post[sample].value <=18){
          color = "#FF4500"
        }
           else if (response.data.post[sample].value > 18 && response.data.post[sample].value <=21){
          color = "#FF0000"
        }
             else if (response.data.post[sample].value > 21 && response.data.post[sample].value <=24){
          color = "#8B0000"
        }
              else if (response.data.post[sample].value > 24 && response.data.post[sample].value <=27){
          color = " #6A5ACD"
        }
               else if (response.data.post[sample].value > 27 && response.data.post[sample].value <=30){
          color = "#483D8B"
        }else{
        color = "#191970"
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
    width: 50px;
    margin-bottom: 6px;
    text-align: center;
    font-size: 80%;
    list-style: none;
    }
  .my-legend ul.legend-labels li span {
    display: block;
    float: left;
    height: 15px;
    width: 50px;
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
