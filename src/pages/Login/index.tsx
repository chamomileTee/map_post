import styles from './Login.module.css';
import logo from '../../assets/images/logo_long.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // React Router에서 페이지 이동에 사용

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(''); // 에러 상태 초기화

        try {
            const response = await fetch('BE_API_URL/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('로그인에 성공하였습니다.');
                
                // 토큰 저장 (예: localStorage 또는 cookie)
                localStorage.setItem('authToken', data.token);

                navigate('/Home');
            } else {
                const errorData = await response.json();
                setError(errorData.message || '로그인에 실패하였습니다.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('서버 오류가 발생하였습니다.');
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.loginContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="PinBoard" className={styles.logo} />
                </div>
                <form onSubmit={handleSubmit}>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            name="email"
                            className={styles.input}
                            placeholder="이메일을 입력하세요."
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            placeholder="비밀번호를 입력하세요."
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        로그인
                    </button>
                </form>
                <div className={styles.signUpLink}>
                    <Link to="/signup">회원가입</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
