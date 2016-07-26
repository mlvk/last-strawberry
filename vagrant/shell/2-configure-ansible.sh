#!/bin/bash

set -e

cat > /tmp/hosts << "EOF"
[all]
127.0.0.1

[application]
127.0.0.1

[ember]
127.0.0.1

EOF

sudo mv -f /tmp/hosts /etc/ansible/hosts
