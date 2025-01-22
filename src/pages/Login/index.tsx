import styles from './Login.module.css';
import logo from '../../assets/images/logo_long.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/slices/authSlice';
import { login } from '../../api/services/auth/auth';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const data = await login(formData.email, formData.password);
            alert('로그인에 성공하였습니다.');
            
            // Redux store에 인증 정보 저장
            dispatch(setAuth(data.token));

            navigate('/Home');
        } catch (err) {
            console.error('Error:', err);
            setError('로그인에 실패하였습니다. 이메일/비밀번호를 확인해주세요.');
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