<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Update Intake</h3>  <!--this will allow for the updating of the intake form with everything from the original intake form -->
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" class="form-control" id="firstName" placeholder="First Name" v-model="form.firstName" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" class="form-control" id="lastName" placeholder="Last Name" v-model="form.lastName" required>
                </div>
                <div class="form-group">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="number" class="form-control" id="phoneNumber" placeholder="Phone Number" v-model="form.phoneNumber" required>
                </div>
                
                <div class="form-group">
                    <label for="refer">How did you hear about our distribution?</label>
                    <select name="how_did_you_hear" class="form-control" id="how_did_you_hear" v-model="form.how_did_you_hear" required>
                        <option value="website">Instagram</option>
                        <option value="newspaper">Twitter</option>
                        <option value="friend">Facebook</option>
                        <option value="online-ad">Word of Mouth</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="zipCode">Zip Code</label>
                    <input type="number" class="form-control" id="zipCode" placeholder="Zip Code" v-model="form.zipCode" required>
                </div>

                <div class="form-group">
                    <label for="formControlRange">Have you received the COVID vaccine? </label><br />
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="have_you_received_vaccine" id="have_you_received_vaccine_yes" value="Yes"
                            v-model="form.have_you_received_vaccine">
                        <label class="form-check-label" for="have_you_received_vaccine">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="have_you_received_vaccine" id="have_you_received_vaccine_no" value="No"
                            v-model="form.have_you_received_vaccine">
                        <label class="form-check-label" for="have_you_received_vaccine">No</label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="formControlRange">Would you like the COVID vaccine during the distribution? (If no, skip next question)</label><br />
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="would_you_like_vaccine" id="would_you_like_vaccine_yes" value="Yes"
                            v-model="form.would_you_like_vaccine">
                        <label class="form-check-label" for="would_you_like_vaccine">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="would_you_like_vaccine" id="would_you_like_vaccine_no" value="No" v-model="form.would_you_like_vaccine">
                        <label class="form-check-label" for="would_you_like_vaccine">No</label>
                    </div>
                </div>

                
                <div class="form-group">
                    <label for="formControlRange">Which COVID vaccine would you prefer to receive?? </label><br />
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="which_covid_vaccine" id="which_covid_vaccine_Pfizer" value="Pfizer"
                            v-model="form.which_covid_vaccine">
                        <label class="form-check-label" for="which_covid_vaccine">Pfizer</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="which_covid_vaccine" id="which_covid_vaccine_Moderna" value="Moderna"
                            v-model="form.which_covid_vaccine">
                        <label class="form-check-label" for="which_covid_vaccine">Moderna</label>
                    </div>
                </div>


                <div class="form-group">
                    <label for="formControlRange">Are you in need of additional supportive services (e.g., utility assistance, rental assistance, housing, nutritional support, etc.)? </label><br />
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="support_services" id="support_services_yes" value="Yes" v-model="form.support_services">
                        <label class="form-check-label" for="support_services">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="support_services" id="support_services_no" value="No" v-model="form.support_services">
                        <label class="form-check-label" for="support_services">No</label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="number_of_children">Number of Children In Household</label>
                    <input type="number" class="form-control" id="number_of_children" placeholder="Number" v-model="form.number_of_children" required>
                </div>

                <div class="form-group">
                    <label for="formControlRange">Are you or anyone in your household 65+ in age?  </label><br />
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="anyone_65" id="anyone_65_yes" value="Yes"
                            v-model="form.anyone_65">
                        <label class="form-check-label" for="anyone_65">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="anyone_65" id="anyone_65_no" value="No"
                            v-model="form.anyone_65">
                        <label class="form-check-label" for="anyone_65">No</label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="formControlRange">Are you a veteran? ?  </label><br />
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="veteran" id="veteran_yes" value="Yes"
                            v-model="form.veteran">
                        <label class="form-check-label" for="veteran">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="veteran" id="veteran_no" value="No"
                            v-model="form.veteran">
                        <label class="form-check-label" for="veteran">No</label>
                    </div>
                </div>



                
                <div class="form-group">
                    <label for="refer">Which of the following best describes you?</label>
                    <select name="refer" class="form-control" id="refre" v-model="form.race" required>
                        <option value="Asian or Pacific Islander">Asian or Pacific Islander</option>
                        <option value="Black or African American">Black or African American</option>
                        <option value="Hispanic or Latino">Hispanic or Latino</option>
                        <option value="Native American or Alaskan Native">Native American or Alaskan Native</option>
                        <option value="White or Caucasian">White or Caucasian</option>
                        <option value="Multiracial or Biracial">Multiracial or Biracial</option>
                        <option value="A race/ethnicity not listed here">A race/ethnicity not listed here</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="intakeID">IntakeID</label>
                    <input type="number" class="form-control" id="intakeID" placeholder="intakeID" v-model="form.intakeID" required>
                </div>
                
                <div class="form-group">
                    <button class="btn btn-danger btn-block">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            form: { }
        }
    },
    created() {
        let apiURL = `http://localhost:3000/intake/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.form = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/intake/${this.$route.params.id}`; //this code will handle the update with press of the update button

            axios.put(apiURL, this.form).then((res) => {
                console.log(res)
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>