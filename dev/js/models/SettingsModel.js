Settings = Backbone.Model.extend({
	defaults: {
		loggedIn: false,
		language: "nl",
		copy: {
			nl: {
				general: {
					title: "DEVINE STAGE EVALUATIE"
				},
				home: {
					companyBtn: "STAGEBEDRIJF OF ORGANISATIE"
				},
				registration: {
					registerTitle: "Registratie",
					registerBtn: "REGISTREER",
					nameField: "Naam",
					emailField: "E-mailadres",
					companyField: "Bedrijf",
					verifyCode: "Verificatie code",
					registerError: "De verificatie code is niet correct!"
				},
				login: {
					loginBtn: "Login",
					emailField: "E-mailadres",
					passwordField: "Paswoord",
					loginError: "Je paswoord is niet correct of je hebt geen toegang tot het stageplatform."
				},
				internships:{
					studentLabel: "Student",
					organisationLabel: "Organisatie",
					mentorLabel: "Begeleider",
					interimLabel: "Tussentijdse evaluatie",
					finalLabel: "Eindevaluatie",
					evaluateBtn: "Vul aan..."
				},
				evaluation: {
					questionLabel: "Vraag",
					ratingLabel: "Beoordeling",
					scoreLabel: "Punt",
					remarkLabel: "Opmerking",
					selectionLabel: "Maak een keuze",
					requiredField: "Dit veld moet worden ingevuld",
					finalScoreLabel: "Eindscore",
					interimLabel: "Tussentijdse evaluatie",
					finalLabel: "Eindevaluatie",
					saveLabel: "Bewaar",
					exportLabel: "Download PDF"
				},
				error: {
					notFound: "<b>404:</b> Deze pagina werd niet gevonden"
				}
			},

			en: {
				general: {
					title: "DEVINE INTERNSHIP EVALUATION"
				},
				home: {
					companyBtn: "COMPANY OR ORGANISATION"
				},
				registration: {
					registerTitle: "Registration",
					registerBtn: "REGISTER",
					nameField: "Name",
					emailField: "Email",
					companyField: "Company",
					verifyCode: "Verification code",
					registerError: "The verification code is incorrect!"
				},
				login: {
					loginBtn: "LOGIN",
					emailField: "Email",
					passwordField: "Password",
					loginError: "The password you have entered is not correct."
				},
				internships:{
					studentLabel: "Student",
					organisationLabel: "Organisation",
					mentorLabel: "Coach",
					interimLabel: "Interim evaluation",
					finalLabel: "Final evaluation",
					evaluateBtn: "Evaluate...",
				},
				evaluation: {
					questionLabel: "Question",
					ratingLabel: "Rating",
					scoreLabel: "Score",
					remarkLabel: "Remark",
					selectionLabel: "Select a score",
					requiredField: "This field is required",
					finalScoreLabel: "Final score",
					interimLabel: "Interim evaluation",
					finalLabel: "Final evaluation",
					saveLabel: "Save",
					exportLabel: "Download PDF"
				},
				error: {
				  notFound: "<b>404:</b> The page could not be found"
				}
			}
		}
	},
	initialize: function(){
    	this.bind("change:language", this.languageChangeHandler)
	},

	// update the language
    languageChangeHandler: function(event){
    	Backbone.trigger('languageChangeHandler');
    }
});

