Workflow Summary:
GitHub CI: Builds Docker image and pushes to Docker Hub

Helm Update: Updates the image tag in values.yaml

ArgoCD: Detects git changes and deploys to EKS using Helm

GitOps: Your git repository with Helm charts is the source of truth

This setup provides:

✅ Helm-based deployments with templating

✅ GitOps workflow with ArgoCD

✅ Docker Hub for container registry

✅ AWS EKS with proper configuration

✅ Automated CI/CD with GitHub Actions

Your Visitor Counter app will now automatically deploy to EKS using Helm and ArgoCD whenever you push to main! 🚀


visitor-counter-app/
├── .github/
│   └── workflows/
│       └── ci-pipeline.yml
├── charts/
│   └── visitor-counter/
│       ├── Chart.yaml
│       ├── values.yaml
│       ├── templates/
│       │   ├── deployment.yaml
│       │   ├── service.yaml
│       │   ├── hpa.yaml
│       │   ├── ingress.yaml
│       │   └── _helpers.tpl
│       └── crds/
├── argocd/
│   └── application.yaml
├── Dockerfile
├── package.json
├── server.js
└── .dockerignore


eksctl create cluster -f cluster-config.yaml


ArgoCD Installation on EKS
bash
# Create argocd namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Get ArgoCD admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Port forward to access UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

Required GitHub Secrets
Set these in your GitHub repository:

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

DOCKERHUB_USERNAME

DOCKERHUB_TOKEN


Deployment Verification
bash
# Check ArgoCD application
argocd app get visitor-counter

# Check Kubernetes resources
kubectl get all -n visitor-counter

# Get LoadBalancer URL
kubectl get svc -n visitor-counter

# Check Helm release
helm list -n visitor-counter

# Test the application
curl http://<loadbalancer-ip>

