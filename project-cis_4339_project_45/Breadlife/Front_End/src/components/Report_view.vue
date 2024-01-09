<template>

    <div class="row">
         <h3> Intake History for intakeID {{ intakeID }}</h3>
                         <router-link :to="{name: 'ihCreate'} " class="btn btn-success">Add Intake History
                            </router-link>
        
        
        <div class="col-md-12">
            <table class="table table-striped"
             >
                
                <thead class="thead-dark">
                    
                    <tr>
                        <th>intakeID</th>
                        <th>distID</th>
                        <th>type</th>
                        <th>date</th>
                        
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="ih in IntakeHistory" :key="ih.intakeID">
                        <td>{{ ih.intakeID }}</td>
                        <td>{{ ih.distID }}</td>
                        <td>{{ ih.type }}</td>
                        <td>{{ ih.date }}</td>

                        <td>
                            <router-link :to="{name: 'ihEdit', params: { id: ih._id }}" class="btn btn-success">Edit</router-link>
                            <button @click.prevent="deleteIH(ih._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
</template>






<script>

    import axios from "axios";

    export default {
        data() {
            return {
                IntakeHistory: []


            }
            
        },
        
        created() {
            let apiURL = `http://localhost:3000/ih_by_intakeid/${this.$route.params.id}`; 
            axios.get(apiURL).then(res => {
                this.IntakeHistory = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteIH(id){
                let apiURL = `http://localhost:3000/del_ih/${id}`;
                let indexOfArrayItem = this.IntakeHistory.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.IntakeHistory.splice(indexOfArrayItem, 1);
                    }).then(() => {
    alert('Form was Deleted')
  })
                }
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>