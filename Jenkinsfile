pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rajashekar447/contact-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    pkill -f "node" || true

                    rm -rf /var/www/contact-app/*

                    cp -r build/* /var/www/contact-app/

                    nohup npx serve -s /var/www/contact-app -l 3000 > app.log 2>&1 &
                '''
            }
        }
    }
}
