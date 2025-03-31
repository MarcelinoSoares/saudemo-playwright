export const users = {
	standardUser: {
		username: 'standard_user',
		password: 'secret_sauce',
	},
	invalidUser: {
		username: 'invalid_user',
		password: 'invalid_password',
	},
	withoutPasswordUser: {
		username: 'standard_user',
		password: '',
	},
	withoutUsernameUser: {
		username: '',
		password: 'secret_sauce',
    },
	lockedOutUser: {
		username: 'locked_out_user',
		password: 'secret_sauce',
	},
	problemUser: {
		username: 'problem_user',
		password: 'secret_sauce',
	},
	performanceGlitchUser: {
		username: 'performance_glitch_user',
		password: 'secret_sauce',
	},
};
