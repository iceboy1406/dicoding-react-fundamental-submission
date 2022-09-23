const idLocalization = {
  components: {
    header: {
      appName: 'Aplikasi Catatan',
      archiveLink: {
        text: 'Arsip',
        tooltip: 'Pergi Ke Arsip',
      },
      homeLink: {
        text: 'Beranda',
        tooltip: 'Ke Beranda',
      },
      colorSchemeSwitch: {
        tooltip: 'Ganti Skema Warna',
      },
      languageSwitch: {
        tooltip: 'Ganti Bahasa',
      },
      logoutButton: {
        tooltip: 'Keluar',
      },
    },
    noteCard: {
      deleteButton: {
        tooltip: 'Hapus Catatan',
        confirmModal: {
          title: 'Hapus Catatan Anda',
          message: {
            firstPart: `Apakah anda yakin ingin menghapus catatan`,
            lastPart: `? Aksi ini akan menghapus catatan anda secara permanen.`,
          },
          button: {
            confirm: {
              text: 'Hapus catatan',
            },
            cancel: {
              text: `Batal`,
            },
          },
        },
        notification: {
          success: {
            title: 'Sukses',
            message: 'Catatan berhasil dihapus',
          },
          failed: {
            title: 'Gagal',
            message: 'Ada sesuatu yang salah. Catatan gagal dihapus',
          },
        },
      },
      archiveButton: {
        tooltip: 'Arsipkan Catatan',
        confirmModal: {
          title: 'Arsipkan Catatan',
          message: {
            firstPart: `Apakah anda yakin ingin mengarsipkan catatan`,
            lastPart: `?`,
          },
          button: {
            confirm: {
              text: 'Arsipkan catatan',
            },
            cancel: {
              text: `Batal`,
            },
          },
        },
        notification: {
          success: {
            title: 'Sukses',
            message: 'Catatan berhasil diarsipkan',
          },
          failed: {
            title: 'Gagal',
            message: 'Ada sesuatu yang salah. Catatan gagal diarsipkan',
          },
        },
      },
      unarchiveButton: {
        tooltip: 'Keluarkan Catatan dari Arsip',
        confirmModal: {
          title: 'Keluarkan Catatan Dari Arsip',
          message: {
            firstPart: `Apakah anda yakin ingin mengeluarkan catatan`,
            lastPart: `dari arsip?`,
          },
          button: {
            confirm: {
              text: 'Keluarkan catatan',
            },
            cancel: {
              text: `Batal`,
            },
          },
        },
        notification: {
          success: {
            title: 'Sukses',
            message: 'Catatan berhasil dikeluarkan dari arsip',
          },
          failed: {
            title: 'Gagal',
            message: 'Ada sesuatu yang salah. Catatan gagal dikeluarkan dari arsip',
          },
        },
      },
      previewButton: {
        tooltip: 'Pergi ke detail catatan',
      },
    },
    searchNote: {
      input: {
        placeholder: 'Cari berdasarkan judul',
      },
      noNoteMessage: {
        searchNotFound: {
          pre: `Maaf kami tidak bisa menemukan data yang cocok untuk pencarian : `,
        },
        noData: {
          archive: `Tidak ada arsip catatan`,
          active: `Tidak ada catatan aktif`,
        },
      },
    },
  },
  pages: {
    login: {
      illustrationCredit: {
        firstPart: 'Kredit ke',
        lastPart: 'di Freepik',
      },
      title: 'Hai, Selamat datang kembali',
      subtitle: 'Senang bertemu denganmu lagi. Ayo login untuk melanjutkan',
      form: {
        email: {
          label: 'Email',
          placeholder: 'Masukan email anda',
          validation: {
            required: 'Email harus diisi',
            validFormat: 'Masukan email yang valid',
            emailNotFound: 'Email tidak ditemukan',
          },
        },
        password: {
          label: 'Password',
          placeholder: 'Masukan password anda',
          validation: {
            required: 'Password harus diisi',
            wrongPassword: 'Password salah',
          },
        },
        submitButton: {
          text: 'Masuk',
        },
      },
      doNotHaveAnAccountText: {
        doNotHaveAnAccount: `Belum memiliki akun?`,
        register: 'Daftar sekarang',
      },
      onSuccessNotification: {
        title: 'Sukses',
        message: 'Pengguna berhasil masuk',
      },
    },
    register: {
      illustrationCredit: {
        firstPart: 'Kredit ke',
        lastPart: 'di Freepik',
      },
      title: 'Mari Kita Mulai',
      subtitle: 'Daftar sekarang dan nikmati menulis catatan anda',
      form: {
        name: {
          label: 'Nama',
          placeholder: 'Masukan nama anda',
          validation: {
            required: 'Nama haru diisi',
          },
        },
        email: {
          label: 'Email',
          placeholder: 'Masukan email anda',
          validation: {
            required: 'Email harus diisi',
            validFormat: 'Masukan emang yang valid',
            emailHaveBeenTaken:
              'Email sudah digunakan oleh user lain. Coba yang lainnya.',
          },
        },
        password: {
          label: 'Password',
          placeholder: 'Masukan password anda',
          validation: {
            required: 'Password harus diisi',
            minLength: 'Password paling tidak 6 karakter',
          },
        },
        passwordConfirmation: {
          label: 'Konfirmasi Password',
          placeholder: 'Masukan konfirmasi password anda',
          validation: {
            required: 'Password harus diisi',
            notMatch: `Password dan Konfirmasi Password tidak sesuai`,
          },
        },
        submitButton: {
          text: 'Daftar',
        },
      },
      doNotHaveAnAccountText: {
        doNotHaveAnAccount: `Sudah memiliki akun?`,
        register: 'Masuk sekarang ',
      },
      onSuccessNotification: {
        title: 'Sukses',
        message: 'User berhasil teregistrasi',
      },
    },
    activeNotes: {
      breadCrumbItems: {
        notesApp: 'Aplikasi Catatan',
        activeNotes: 'Catatan Aktif',
      },
      createNewNoteButton: {
        text: 'Catatan Baru',
      },
      createNewNoteModal: {
        title: 'Buat Catatan Baru',
        form: {
          title: {
            label: 'Judul',
            placeholder: 'Masukan judul catatan',
            validation: {
              required: 'Judul catatan harus diisi',
            },
          },
          body: {
            label: 'Isi',
            placeholder: 'Masukan isi catatan',
            validation: {
              required: 'Isi catatan harus diisi',
            },
          },
          submitButton: {
            text: 'Simpan',
          },
        },
      },
    },
    archivedNotes: {
      breadCrumbItems: {
        notesApp: 'Aplikasi Catatan',
        archivedNotes: 'Arsip Catatan',
      },
    }
  },
  unAuthorizedNotification: {
    title: 'Tidak Punya Akses',
    message: `Anda tidak memiliki akses untuk mengakses halaman tersebut. Silahkan masuk terlebih dahulu.`,
  },
}

export default idLocalization
