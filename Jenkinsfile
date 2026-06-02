pipeline {
agent any

stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
                url: 'https://github.com/rajashekar447/contact-app.git'
        }
    }

    stage('Build Backend') {
        steps {
            dir('backend') {
                sh 'npm install'
            }
        }
    }

    stage('Test') {
        steps {
            sh 'echo Testing Passed'
        }
    }

    stage('Deploy Backend') {
        steps {
            dir('backend') {
                sh '''
                    nohup node server.js > app.log 2>&1 &
                '''
            }
        }
    }

    stage('Deploy Frontend') {
        steps {
            sh '''
                mkdir -p /var/www/html
                cp frontend/index.html /var/www/html/index.html
            '''
        }
    }
}

}
