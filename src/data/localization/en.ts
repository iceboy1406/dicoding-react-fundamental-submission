const enLocalization = {
  components: {
    header: {
      appName: 'Notes App',
      archiveLink: {
        text: 'Archive',
        tooltip: 'Go to Archive',
      },
      homeLink: {
        text: 'Home',
        tooltip: 'Go to Home',
      },
      colorSchemeSwitch: {
        tooltip: 'Switch Color Scheme',
      },
      languageSwitch: {
        tooltip: 'Switch Language',
      },
      logoutButton: {
        tooltip: 'Logout',
      },
    },
    noteCard: {
      deleteButton: {
        tooltip: 'Delete Note',
        confirmModal: {
          title: 'Delete Your Note',
          message: {
            firstPart: `Are you sure you want to delete`,
            lastPart: `note ? This action will permanently delete your note!`,
          },
          button: {
            confirm: {
              text: 'Delete note',
            },
            cancel: {
              text: `No don't delete it`,
            },
          },
        },
        notification: {
          success: {
            title: 'Success',
            message: 'Note successfully deleted',
          },
          failed: {
            title: 'Failed',
            message: 'Something went wrong. Failed delete note',
          },
        },
      },
      archiveButton: {
        tooltip: 'Archive Note',
        confirmModal: {
          title: 'Archive Your Note',
          message: {
            firstPart: `Are you sure you want to archive`,
            lastPart: `note ?`,
          },
          button: {
            confirm: {
              text: 'Archive note',
            },
            cancel: {
              text: `No don't archive it`,
            },
          },
        },
        notification: {
          success: {
            title: 'Success',
            message: 'Note successfully archived',
          },
          failed: {
            title: 'Failed',
            message: 'Something went wrong. Failed archive note',
          },
        },
      },
      unarchiveButton: {
        tooltip: 'Unarchive Note',
        confirmModal: {
          title: 'Unarchive Your Note',
          message: {
            firstPart: `Are you sure you want to unarchive`,
            lastPart: `note ?`,
          },
          button: {
            confirm: {
              text: 'Unarchive note',
            },
            cancel: {
              text: `No don't unarchive it`,
            },
          },
        },
        notification: {
          success: {
            title: 'Success',
            message: 'Note successfully Un Archived',
          },
          failed: {
            title: 'Failed',
            message: 'Something went wrong. Failed unarchive note',
          },
        },
      },
      previewButton: {
        tooltip: 'Go to Note Detail',
      },
    },
    searchNote: {
      input: {
        placeholder: 'Search by title',
      },
      noNoteMessage: {
        searchNotFound: {
          pre: `Sorry we couldn't find any matches for search: `,
        },
        noData: {
          archive: `There's no archived note`,
          active: `There's no active note`,
        },
      },
    },
  },
  pages: {
    login: {
      illustrationCredit: {
        firstPart: 'Credit to',
        lastPart: 'on Freepik',
      },
      title: 'Hi, Welcome Back',
      subtitle: 'Nice to meet you again. Lets login to continue',
      form: {
        email: {
          label: 'Email',
          placeholder: 'Enter your email',
          validation: {
            required: 'Email is required',
            validFormat: 'Invalid email format',
            emailNotFound: 'Email not found',
          },
        },
        password: {
          label: 'Password',
          placeholder: 'Enter your password',
          validation: {
            required: 'Password is required',
            wrongPassword: 'Password is wrong',
          },
        },
        submitButton: {
          text: 'Login',
        },
      },
      doNotHaveAnAccountText: {
        doNotHaveAnAccount: `Don't have an account?`,
        register: 'Register now ',
      },
      onSuccessNotification: {
        title: 'Success',
        message: 'User logged successfully',
      },
    },
    register: {
      illustrationCredit: {
        firstPart: 'Credit to',
        lastPart: 'on Freepik',
      },
      title: 'Lets Get Started',
      subtitle: 'Register now and enjoy write your notes',
      form: {
        name: {
          label: 'Name',
          placeholder: 'Enter your name',
          validation: {
            required: 'Name is required',
          },
        },
        email: {
          label: 'Email',
          placeholder: 'Enter your email',
          validation: {
            required: 'Email is required',
            validFormat: 'Invalid email format',
            emailHaveBeenTaken: 'Email already been taken. Try another.',
          },
        },
        password: {
          label: 'Password',
          placeholder: 'Enter your password',
          validation: {
            required: 'Password is required',
            minLength: 'Password atleast 6 character',
          },
        },
        passwordConfirmation: {
          label: 'Password Confirmation',
          placeholder: 'Enter your password confirmation',
          validation: {
            required: 'Password Confirmation is required',
            notMatch: `Password and Password Confirmation doesn't match`,
          },
        },
        submitButton: {
          text: 'Register',
        },
      },
      doNotHaveAnAccountText: {
        doNotHaveAnAccount: `Already have an account?`,
        register: 'Login now ',
      },
      onSuccessNotification: {
        title: 'Success',
        message: 'User registered successfully',
      },
    },
    activeNotes: {
      breadCrumbItems: {
        notesApp: 'Notes App',
        activeNotes: 'Active Notes',
      },
      createNewNoteButton: {
        text: 'New Note',
      },
      createNewNoteModal: {
        title: 'Create New Note',
        form: {
          title: {
            label: 'Title',
            placeholder: 'Enter note title',
            validation: {
              required: 'Title is required',
            },
          },
          body: {
            label: 'Body',
            placeholder: 'Enter note body',
            validation: {
              required: 'Body is required',
            },
          },
          submitButton: {
            text: 'Submit',
          },
        },
      },
    },
    archivedNotes: {
      breadCrumbItems: {
        notesApp: 'Notes App',
        archivedNotes: 'Archive Notes',
      },
    }
  },
  unAuthorizedNotification: {
    title: 'Unauthorized',
    message: `You don't have Authorization to access page, Please login first.`,
  },
}

export default enLocalization
