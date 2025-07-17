export const production_config = {
  emailApiToken: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImEiLCJlbWFpbCI6ImEiLCJjcmVhdGVkQXQiOiIyMDIxLTA0LTE5VDEyOjIyOjUyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA0LTE5VDEyOjIyOjUyLjAwMFoiLCJkZWxldGVkQXQiOm51bGwsImFjY291bnRJZCI6MSwiY29tcGFueVByb2ZpbGVzIjpbeyJpZCI6MSwibmFtZSI6ImNveSIsImVtYWlsIjoiY295IiwiY3JlYXRlZEF0IjoiMjAyMS0wNC0xOVQxMjoyMjo1Mi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0xOVQxMjoyMjo1Mi4wMDBaIiwiZGVsZXRlZEF0IjpudWxsLCJ1c2VyWENvbXBhbnkiOnsiaWQiOjEsInJvbGUiOiJBRE1JTiIsImNyZWF0ZWRBdCI6IjIwMjEtMDQtMTlUMTI6MjI6NTIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDQtMTlUMTI6MjI6NTIuMDAwWiIsImRlbGV0ZWRBdCI6bnVsbCwidXNlclByb2ZpbGVJZCI6MSwiY29tcGFueVByb2ZpbGVJZCI6MX19XSwicHJvZmlsZVR5cGUiOiJ1c2VyUHJvZmlsZSIsImlhdCI6MTY4MzU2MDE2MSwiZXhwIjoxNzE5NTU2NTYxLCJhdWQiOiJCSSBTeXN0ZW0iLCJpc3MiOiJMRU8iLCJzdWIiOiJQcm9maWxlIn0.Lq98RdyWvGtJr9aJDloK_VHH0ODsdogM72qfuUcBuNp98eScPO4G0bu-Xnp517tmsVIHCxiY6sPYR-I-EWUWaA`,
  emailApi: `https://email.qzonetech.com/company/job/add`,
  emailJobApiRaw: `https://email.qzonetech.com/company/job/`,
  serverPath: `/var/timbre/`,
  domain: `https://timbre.qztlive.com/`,
  mediaFolder: `/var/www/media/`,
  mediaUrl: `https://timbremedia.qztlive.com/`,
  mode: `production`,

  tencentIM: {
    chatKey: 'a8a1687c7797ab3df526f13659ccd3da6f0859882250745752399bee37c695d6',
    chatDomain: 'adminapisgp.im.qcloud.com',
    chatAppId: 20004051,
    chatIdentifier: 'administrator',
    chatSig:
      'eJwtzMsKwjAUBNB-uWspSUgUC26KFLUFBYv7QFJ70TyahvrCf9c*lnNmmA9U5TnpdYAUWEJgMWZU2kascWSpDFrsYpDRhXnQqZv0HhWkjBDCiaCT66fHoCGlQoihmTSiGWy55ivBOWPzB17-74e9P17U1ha11UX7umfMnrhqct7vyobQR9bGd*WoEbnbwPcHCbM01w__',
    userIdPrefix: 'cee_events',
  },

  db: {
    host: 'localhost',
    database: 'cee_events',
    port: '3306',
    username: '',
    password: '',

    seekAccount: false,
    syncForce: false,
    syncAlter: false,
    seek: {
      username: 'a',
      password: '123',
      companyName: 'QZT',
    },
  },
};
// mysqlbackup
// https://medium.com/@sheetalkumarmaurya/mysql-database-backup-daily-automatically-in-ubuntu-server-using-cron-c4cd5cbfe9a4
// server swap and cache
// https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-20-04

// adjust volumn
// https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html
// take note on ext file type
// lsblk
// sudo growpart /dev/xvda 1 (with space 1)
// sudo resize2fs /dev/xvda1 (no space 1)

// select * from information_schema.processlist;
// select @@max_connections;
// show status where `variable_name` = 'Threads_connected';
// set global max_connections = 250;
