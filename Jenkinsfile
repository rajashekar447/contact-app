pipeline {
agent any

```
environment {
    APP_NAME = "contact-app"
    APP_DIR  = "/opt/contact-app"
}

stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
                url: 'https://github.com/rajashekar447/contact-app.git'
        }
    }

    stage('Install Dependencies') {
        steps {
            dir('backend') {
                sh 'npm install'
            }
        }
    }

    stage('Deploy') {
        steps {
            sh '''
                mkdir -p ${APP_DIR}

                echo "Stopping old application..."
                pkill -f "server.js" || true

                echo "Removing old deployment..."
                rm -rf ${APP_DIR}/*

                echo "Copying files..."
                cp -r backend ${APP_DIR}/
                cp -r frontend ${APP_DIR}/

                echo "Starting application..."
                cd ${APP_DIR}/backend

                nohup node server.js > app.log 2>&1 &

                sleep 5

                echo "Application Status:"
                ps -ef | grep node | grep server.js || true
            '''
        }
    }
}

post {
    success {
        echo 'Deployment Successful'
    }

    failure {
        echo 'Deployment Failed'
    }
}
```

}
