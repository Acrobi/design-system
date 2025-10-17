import React, { useState, useEffect } from 'react';
export default function ForceDarkTest() {
    const [isDark, setIsDark] = useState(false);
    const [htmlHasDark, setHtmlHasDark] = useState(false);
    useEffect(() => {
        // Check if HTML element has dark class
        const checkHtmlClass = () => {
            const html = document.documentElement;
            setHtmlHasDark(html.classList.contains('dark'));
        };
        checkHtmlClass();
        const interval = setInterval(checkHtmlClass, 500);
        return () => clearInterval(interval);
    }, []);
    const toggleDarkMode = () => {
        const html = document.documentElement;
        const newDarkState = !isDark;
        if (newDarkState) {
            html.classList.add('dark');
            // Force dark styles inline
            html.style.backgroundColor = '#000000';
            html.style.color = '#ffffff';
            document.body.style.backgroundColor = '#000000';
            document.body.style.color = '#ffffff';
        }
        else {
            html.classList.remove('dark');
            // Force light styles inline
            html.style.backgroundColor = '#ffffff';
            html.style.color = '#000000';
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#000000';
        }
        setIsDark(newDarkState);
        // Force reflow
        html.offsetHeight;
    };
    return (<div style={{
            backgroundColor: isDark ? '#000000' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            minHeight: '100vh',
            padding: '2rem',
            transition: 'all 0.3s ease'
        }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', space: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          FORCE DARK MODE TEST
        </h1>

        <div style={{
            padding: '2rem',
            backgroundColor: isDark ? '#111111' : '#f8f9fa',
            color: isDark ? '#ffffff' : '#000000',
            border: `2px solid ${isDark ? '#333333' : '#e5e5e5'}`,
            borderRadius: '0.5rem',
            marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Debug Information
          </h2>
          <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.5' }}>
            <p>isDark State: {isDark.toString()}</p>
            <p>HTML has 'dark' class: {htmlHasDark.toString()}</p>
            <p>Current background: {isDark ? '#000000' : '#ffffff'}</p>
            <p>Current text: {isDark ? '#ffffff' : '#000000'}</p>
          </div>

          <button onClick={toggleDarkMode} style={{
            padding: '1rem 2rem',
            backgroundColor: isDark ? '#a855f7' : '#3b82f6',
            color: isDark ? '#000000' : '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '1rem'
        }}>
            {isDark ? '☀️ SWITCH TO LIGHT' : '🌙 SWITCH TO DARK'}
          </button>
        </div>

        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem'
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: isDark ? '#a855f7' : '#3b82f6',
            color: isDark ? '#000000' : '#ffffff',
            borderRadius: '0.5rem',
            textAlign: 'center'
        }}>
            Primary
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: isDark ? '#222222' : '#6b7280',
            color: isDark ? '#ffffff' : '#ffffff',
            borderRadius: '0.5rem',
            textAlign: 'center'
        }}>
            Secondary
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: isDark ? '#ef4444' : '#10b981',
            color: '#ffffff',
            borderRadius: '0.5rem',
            textAlign: 'center'
        }}>
            {isDark ? 'Danger' : 'Success'}
          </div>
        </div>

        <div style={{
            padding: '2rem',
            backgroundColor: isDark ? '#333333' : '#f3f4f6',
            color: isDark ? '#ffffff' : '#000000',
            border: `2px solid ${isDark ? '#555555' : '#d1d5db'}`,
            borderRadius: '0.5rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            This Should Be VERY Obvious
          </h3>
          <p>
            If you can see this section change from light gray to dark gray when clicking the button above,
            then dark mode is working with JavaScript and CSS classes.
          </p>
          <p>
            The background should be: <strong>{isDark ? 'BLACK' : 'WHITE'}</strong>
          </p>
          <p>
            The text should be: <strong>{isDark ? 'WHITE' : 'BLACK'}</strong>
          </p>
        </div>

        <div style={{
            padding: '1rem',
            backgroundColor: isDark ? '#444444' : '#e5e5e5',
            color: isDark ? '#ffffff' : '#000000',
            borderRadius: '0.5rem',
            textAlign: 'center',
            fontSize: '0.875rem'
        }}>
          <p><strong>Test Instructions:</strong></p>
          <ol style={{ textAlign: 'left', paddingLeft: '1.5rem' }}>
            <li>Click the button above</li>
            <li>Background should change dramatically</li>
            <li>Text should change from black to white</li>
            <li>All cards should change colors</li>
            <li>This should be unmistakable</li>
          </ol>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=force-dark-test.jsx.map