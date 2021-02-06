<template>
    <div>
        <div style="padding: 10px 0">
            <div>
                <label style="display: inline-block; width: 60px; color: #FFF">Start</label>
                <input type="text" v-model="start" />
            </div>
            <div>
                <label style="display: inline-block; width: 60px; color: #FFF">Finish</label>
                <input type="text" v-model="finish" />
            </div>
            <button type="button" v-on:click="route()">Route</button>
        </div>
        <!-- <HereMap ref="map" appId="TS5mSZzmB8Fwk5xpSW6Z" appCode="fYBOe7palTdzm75heXt6UoUc3p9jRTnfuhLDuh8slQk" lat="37.7397" lng="-121.4252" width="60" height="530px" /> -->
    </div>
</template>

<script>
    // import HereMap from "../components/HereMap"
    export default {
        name: 'Smap',
        components: {
            // HereMap
        },
        // data() {
        //     return {
        //         start: "",
        //         finish: ""
        //     }
        // },
        // methods: {
        //     route() {
        //         this.$refs.map.route(this.start,this.finish);
        //     }
        // }
    }
</script>

<style>
 
</style>