import Layout from '../components/layout'

export default function PolicyPage () {
  return (
    <Layout>
      <h2>Terms of Service</h2>
      <p>
        TODO.
      </p>
      <h2>Privacy Policy</h2>
      <p>
        This site uses JSON Web Tokens and an in-memory database which resets every ~2 hours.
      </p>
      <p>
        This site records personal data for archery athletes with the goal of registering them
        into archery tournaments. The data is not shared
        with people or organizations not related to registered achery clubs or organizations.
      </p>
      <p>
        Data provided to this site with the purpose of supporting signing in
        is not passed to any third party services, other than via SMTP or OAuth for the
        purposes of authentication.
      </p>
    </Layout>
  )
}