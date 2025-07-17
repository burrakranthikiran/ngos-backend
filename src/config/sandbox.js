export const sandbox_config = {
  emailApiToken: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImEiLCJlbWFpbCI6ImEiLCJjcmVhdGVkQXQiOiIyMDIxLTA0LTE5VDEyOjIyOjUyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA0LTE5VDEyOjIyOjUyLjAwMFoiLCJkZWxldGVkQXQiOm51bGwsImFjY291bnRJZCI6MSwiY29tcGFueVByb2ZpbGVzIjpbeyJpZCI6MSwibmFtZSI6ImNveSIsImVtYWlsIjoiY295IiwiY3JlYXRlZEF0IjoiMjAyMS0wNC0xOVQxMjoyMjo1Mi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0xOVQxMjoyMjo1Mi4wMDBaIiwiZGVsZXRlZEF0IjpudWxsLCJ1c2VyWENvbXBhbnkiOnsiaWQiOjEsInJvbGUiOiJBRE1JTiIsImNyZWF0ZWRBdCI6IjIwMjEtMDQtMTlUMTI6MjI6NTIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDQtMTlUMTI6MjI6NTIuMDAwWiIsImRlbGV0ZWRBdCI6bnVsbCwidXNlclByb2ZpbGVJZCI6MSwiY29tcGFueVByb2ZpbGVJZCI6MX19XSwicHJvZmlsZVR5cGUiOiJ1c2VyUHJvZmlsZSIsImlhdCI6MTY4MzU2MDE2MSwiZXhwIjoxNzE5NTU2NTYxLCJhdWQiOiJCSSBTeXN0ZW0iLCJpc3MiOiJMRU8iLCJzdWIiOiJQcm9maWxlIn0.Lq98RdyWvGtJr9aJDloK_VHH0ODsdogM72qfuUcBuNp98eScPO4G0bu-Xnp517tmsVIHCxiY6sPYR-I-EWUWaA`,
  emailApi: `https://email.qzonetech.com/company/job/add`,
  emailJobApiRaw: `https://email.qzonetech.com/company/job/`,
  api: `https://timbreapi.qztbox.com`,
  serverPath: `/var/EVENTS/`,
  domain: `https://eventsorg.ceesolutionbox.com/`,
  mediaFolder: `/var/www/media/CYCYLENET/`,
  // mediaFolder: `/Users/qzt01/Documents/nginx/`,
  mediaUrl: `https://cyclenetmedia.ceesolutionbox.com`,
  mode: `sandbox`,

  tencentIM: {
    chatKey: 'a8a1687c7797ab3df526f13659ccd3da6f0859882250745752399bee37c695d6',
    chatDomain: 'adminapisgp.im.qcloud.com',
    chatAppId: 20004051,
    chatIdentifier: 'administrator',
    chatSig:
      'eJwtzMsKwjAUBNB-uWspSUgUC26KFLUFBYv7QFJ70TyahvrCf9c*lnNmmA9U5TnpdYAUWEJgMWZU2kascWSpDFrsYpDRhXnQqZv0HhWkjBDCiaCT66fHoCGlQoihmTSiGWy55ivBOWPzB17-74e9P17U1ha11UX7umfMnrhqct7vyobQR9bGd*WoEbnbwPcHCbM01w__',
    userIdPrefix: 'cee_cyclenet',
  },

  db: {
    host: 'sg-cdb-rxq9bm5l.sql.tencentcdb.com',
    database: 'cee_cyclenet',
    port: '63967',
    username: 'qsand',
    password: 'Qsand123!',
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
