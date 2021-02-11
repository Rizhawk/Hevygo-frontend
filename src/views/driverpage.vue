<template>
    <v-container>
        <v-layout wrap justify-center row class="mx-10 my-10"> 
            <v-flex>
                 <h1>Drivers Page</h1><v-btn @click.prevent="logout">Logout</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name:'Dpage',
    data:()=>{
        return{
        
        }
        
    },
    methods:{
        logout(){
            this.$session.destroy();
            this.$router.push({name:"Login"});
        }
    }
}
</script>