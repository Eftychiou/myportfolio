import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/_consts';
import Image from 'next/image';
import Link from 'next/link';
import SignOutButton from '../_components/SignOutButton';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={styles.unauthorizedContainer}>
        <p style={styles.unauthorizedText}>You are not authorized. Please sign in.</p>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.subtitle}>Welcome, {session.user?.name}</p>
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt='User profile'
            width={100}
            height={100}
            style={styles.profileImage}
            unoptimized
          />
        )}
        <div style={{ marginTop: 20 }}>
          <SignOutButton />
        </div>
      </div>

      <h2 style={styles.sectionTitle}>Admin Links</h2>
      <div style={styles.linkGrid}>
        <Link href='/admin/todo' style={styles.card}>
          <Image src='/images/cypos.png' alt='Todo' width={200} height={200} unoptimized style={styles.cardImage} />
          <p style={styles.cardLabel}>Todo</p>
        </Link>

        <Link href='/admin/files' style={styles.card}>
          <Image src='/images/cypos.png' alt='Files' width={200} height={200} unoptimized style={styles.cardImage} />
          <p style={styles.cardLabel}>Files</p>
        </Link>

        <Link href='/admin/projects' style={styles.card}>
          <Image src='/images/cypos.png' alt='Projects' width={200} height={200} unoptimized style={styles.cardImage} />
          <p style={styles.cardLabel}>Projects</p>
        </Link>
        <Link href='https://geef.cc/cypos/visits' style={styles.card}>
          <Image src='/images/cypos.png' alt='Projects' width={200} height={200} unoptimized style={styles.cardImage} />
          <p style={styles.cardLabel}>Cypos visits</p>
        </Link>
        <Link href='https://geef.cc/cypos/licenses?password=geef' style={styles.card}>
          <Image src='/images/cypos.png' alt='Projects' width={200} height={200} unoptimized style={styles.cardImage} />
          <p style={styles.cardLabel}>Cypos Licenses</p>
        </Link>
        <Link href='https://geef.cc/cypos/visitors?message=hello' style={styles.card}>
          <Image src='/images/cypos.png' alt='Projects' width={200} height={200} unoptimized style={styles.cardImage} />
          <p style={styles.cardLabel}>Cypos send Message</p>
        </Link>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    maxWidth: 1000,
    margin: '60px auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  header: {
    textAlign: 'center',
    paddingBottom: 30,
    borderBottom: '1px solid #ddd'
  },
  title: {
    fontSize: 36,
    margin: 0,
    color: '#333'
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8
  },
  profileImage: {
    borderRadius: '50%',
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 28,
    marginTop: 40,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  linkGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: 30,
    flexWrap: 'wrap'
  },
  card: {
    display: 'inline-block',
    width: 220,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: '#333',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    padding: 10
  },
  cardImage: {
    borderRadius: 8
  },
  cardLabel: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 500
  },
  unauthorizedContainer: {
    marginTop: 100,
    textAlign: 'center'
  },
  unauthorizedText: {
    fontSize: 20,
    color: '#c00'
  }
};
