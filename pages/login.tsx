import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../src/context/AuthContext';
import { signUpWithEmailPasswordAndUsername, loginWithUsername } from '../src/services/auth';

type Mode = 'signin' | 'signup';

export default function LoginPage() {
  const session = useContext(AuthContext);
  const router = useRouter();

  const [mode, setMode] = useState<Mode>('signin');

  // Sign in fields (username + password)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Sign up fields (email for verify once)
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPassword2, setRegPassword2] = useState('');

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (session) router.replace('/');
  }, [session, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null); setErr(null);
    setLoading(true);
    try {
      await loginWithUsername(username.trim(), password);
      router.replace('/');
    } catch (error: any) {
      const m = error?.message?.toLowerCase?.() ?? '';
      if (m.includes('invalid') || m.includes('credentials')) {
        setErr('Sai username hoặc mật khẩu.');
      } else if (m.includes('confirm')) {
        setErr('Email chưa xác thực. Hãy xác thực email đã đăng ký trước.');
      } else {
        setErr(error?.message ?? 'Đăng nhập thất bại');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null); setErr(null);

    if (!regEmail || !regUsername || !regPassword) {
      setErr('Vui lòng nhập username, email và mật khẩu.');
      return;
    }
    if (regPassword.length < 6) {
      setErr('Mật khẩu tối thiểu 6 ký tự.');
      return;
    }
    if (regPassword !== regPassword2) {
      setErr('Xác nhận mật khẩu không khớp.');
      return;
    }

    setLoading(true);
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : undefined;
      await signUpWithEmailPasswordAndUsername(regEmail.trim(), regPassword, regUsername.trim(), origin);
      setMsg('Đăng ký thành công! Hãy kiểm tra email để XÁC THỰC (1 lần). Sau đó bạn có thể đăng nhập bằng username + password.');
      setMode('signin');
    } catch (error: any) {
      setErr(error?.message ?? 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">ZuMoney</h1>
        <p className="text-sm text-[var(--muted)] mb-4">Đăng nhập bằng username & mật khẩu</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded ${mode === 'signin' ? 'bg-white/10' : 'bg-white/5'}`}
            onClick={() => setMode('signin')}
          >
            Sign in
          </button>
          <button
            className={`px-3 py-1 rounded ${mode === 'signup' ? 'bg-white/10' : 'bg-white/5'}`}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
        </div>

        {mode === 'signin' ? (
          <form onSubmit={handleSignIn}>
            <input
              className="w-full p-3 rounded mb-3"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            <input
              className="w-full p-3 rounded mb-3"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button className="btn w-full" type="submit" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <input
              className="w-full p-3 rounded mb-3"
              type="text"
              placeholder="Username (duy nhất)"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              required
            />
            <input
              className="w-full p-3 rounded mb-3"
              type="email"
              placeholder="Email (để xác thực 1 lần)"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <input
              className="w-full p-3 rounded mb-3"
              type="password"
              placeholder="Mật khẩu (>= 6 ký tự)"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <input
              className="w-full p-3 rounded mb-3"
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={regPassword2}
              onChange={(e) => setRegPassword2(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button className="btn w-full" type="submit" disabled={loading}>
              {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
            </button>
          </form>
        )}

        {msg && <p className="text-emerald-400 text-sm mt-3">{msg}</p>}
        {err && <p className="text-red-400 text-sm mt-3">{err}</p>}
      </div>
    </div>
  );
}
