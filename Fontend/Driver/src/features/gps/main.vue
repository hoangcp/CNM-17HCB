
<template>
  <div>
    <app-googlemap/>
  </div>
</template>

<script>
import googlemap from './components/googlemap'

export default {
  name: 'Gps',
  components: {
    'app-googlemap': googlemap
  },
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    }
  }
}
</script>
