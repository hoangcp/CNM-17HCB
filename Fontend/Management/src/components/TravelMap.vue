<template>	
  <GoogleMapLoader
    :mapConfig="mapConfig"
    apiKey="AIzaSyCEheMxtUig64jFuGOWEjAPhsCFKDpy-OA">
	<template slot-scope="{ google, map }">
		<GoogleMapMarker
			v-for="marker in markers"
			:key="marker.id"
			:marker="marker"
			:google="google"
			:map="map"/>
		<GoogleMapLine
			v-for="line in lines"
			:key="line.id"
			:path.sync="line.path"
			:google="google"
			:map="map"/>
	</template>
  </GoogleMapLoader>
</template>
<script>
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'
import GoogleMapLine from './GoogleMapLine'
import { mapSettings } from '@/constants/mapSettings'

export default {
	components: {
		GoogleMapLoader,
		GoogleMapMarker,
		GoogleMapLine
	},

data () {
	return {    	
		markers: [
			{ id: 'a', position: { lat: 10.762658, lng: 106.6649511 } },
			{ id: 'b', position: { lat: 10.7526639, lng: 106.7314304} }
		],

		lines: [
			{ id: '1', path: [{ lat: 10.762658, lng: 106.6649511 }, { lat: 10.7526639, lng: 106.7314304 }] } 
		],
	}
},

  computed: {
    mapConfig () {
      return {
        ...mapSettings,
        center: this.mapCenter
      }
    },

    mapCenter () {
      return this.markers[1].position
    }
  },

  method: {

  }
}
</script>