# Linux Cheat Sheet for QA, SDET, Testers & Performance Engineers

Practical commands for test execution, log analysis, API checks, process monitoring, performance investigation, networking, containers, and CI troubleshooting.

> [!IMPORTANT]
> Replace example paths, process IDs, ports, hosts, and filenames before running commands. Use least privilege and follow your organization's access and data-handling policies.

## 1. Navigation

```bash
pwd                         # Print the current working directory.
ls                          # List files and directories.
ls -l                       # Long listing: permissions, owner, size, and modification time.
ls -la                      # Long listing including hidden files.
ls -lh                      # Show file sizes in human-readable units.
ls -lt                      # Sort by modification time (newest first).
ls -ltr                     # Sort by modification time (oldest first).
cd /path/to/project         # Change to an absolute path.
cd folder                   # Change to a child directory.
cd ..                       # Move up one directory.
cd ~                        # Go to your home directory.
cd -                        # Return to the previous directory.
tree -L 2                   # Show a directory tree two levels deep (if tree is installed).
```

## 2. File & Directory Operations

```bash
touch results.txt           # Create an empty file or update its modification time.
mkdir reports               # Create a directory.
mkdir -p reports/api/v1     # Create nested directories as needed.
cp file1.txt file2.txt      # Copy a file.
cp -r suite1 suite2         # Copy a directory recursively.
cp -a source/ backup/       # Preserve permissions, timestamps, and links while copying.
mv old.log archived.log     # Move or rename a file.
rm file.txt                 # Delete a file.
rm -i file.txt              # Ask before deleting a file.
rmdir empty-folder          # Remove an empty directory.
cat file.txt                # Display the complete file.
less file.txt               # View a file page by page; press q to quit.
head -n 20 file.txt         # Display the first 20 lines.
tail -n 100 app.log         # Display the last 100 lines.
tail -F app.log             # Follow new log lines and survive log rotation.
stat file.txt               # Show size, permissions, and timestamps.
file artifact.bin           # Detect the file type.
```

> [!CAUTION]
> `rm -rf` recursively deletes without normal recovery and a typo can destroy the wrong tree. **Always verify the exact path first**, for example with `ls -la -- /exact/path`, then delete only the verified path with `rm -rf -- /exact/path`. Avoid variables, wildcards, `~`, and broad paths when deleting. Prefer `rm -ri` when practical.

```bash
ls -la -- /tmp/test-run-123                 # Safe habit: inspect the exact target first.
rm -ri -- /tmp/test-run-123                 # Safer interactive recursive removal.
rm -rf -- /tmp/test-run-123                 # Destructive: only after exact-path verification.
```

## 3. Finding Files

Search the smallest relevant subtree whenever possible; it is faster and avoids irrelevant permission errors.

```bash
find . -type f -name "*.log"                         # Find .log files below the current directory.
find ./src -type f -name "*.java"                   # Find Java source files in ./src.
find ./reports -type f -iname "*result*"             # Case-insensitive filename search.
find ./logs -type f -mtime -1                        # Files modified in the last 24 hours.
find ./logs -type f -mmin -30                        # Files modified in the last 30 minutes.
find ./artifacts -type f -size +100M                 # Files larger than 100 MiB.
find ./results -type f -empty                        # Empty result files.
find ./logs -type f -name "*.log" -print0 | xargs -0 grep -l "ERROR"  # Safely handle spaces.
```

If a system-wide search is truly necessary, suppress only permission-denied diagnostics:

```bash
find / -type f -name "config.yaml" 2>/dev/null       # Broad and potentially slow; hides errors.
find /etc /opt /srv -type f -name "config.yaml" 2>/dev/null  # Better: search likely subtrees.
```

## 4. Searching Inside Files with `grep`

```bash
grep "ERROR" app.log                   # Find lines containing ERROR.
grep -i "timeout" app.log              # Case-insensitive search.
grep -n "Exception" app.log            # Include line numbers.
grep -r "payment" ./logs               # Search recursively.
grep -R "payment" ./logs               # Recursive search that follows symbolic links.
grep -c "ERROR" app.log                # Count matching lines.
grep -l "ERROR" ./*.log                # Print names of files containing a match.
grep -v "healthcheck" access.log       # Exclude matching lines.
grep -w "FAIL" results.txt             # Match the complete word only.
grep -E "ERROR|WARN|FATAL" app.log      # Match alternatives using extended regex.
grep -F "a[b]" app.log                 # Treat the search text literally, not as regex.
grep -A 5 "Exception" app.log          # Show the match and 5 lines after it.
grep -B 5 "Exception" app.log          # Show 5 lines before the match.
grep -C 5 "Exception" app.log          # Show 5 lines before and after the match.
grep --color=auto -nC 3 "ERROR" app.log # Highlight matches with line numbers and context.
```

Useful pipelines:

```bash
grep -E "ERROR|FATAL" app.log | tail -n 50       # Last 50 severe log entries.
grep "HTTP/1.1\" 5[0-9][0-9]" access.log       # Approximate HTTP 5xx search in common logs.
grep -oE 'status=[0-9]{3}' app.log | sort | uniq -c | sort -nr  # Count status values.
zgrep -nC 3 "Exception" app.log.1.gz             # Search a gzip-compressed rotated log.
```

> `rg` (ripgrep), when installed, is usually faster and respects `.gitignore`: `rg -n -C 3 'ERROR|FATAL' ./logs`.

## 5. Viewing, Comparing & Transforming Text

```bash
wc -l results.csv                         # Count lines.
sort results.txt                          # Sort lines alphabetically.
sort -n timings.txt                       # Sort numerically.
sort data.txt | uniq                      # Remove adjacent duplicate lines.
sort data.txt | uniq -c | sort -nr        # Frequency count, highest first.
cut -d',' -f1,3 results.csv               # Select CSV fields 1 and 3 (simple CSV only).
awk '{print $1, $NF}' access.log          # Print first and last whitespace-separated fields.
awk '$9 >= 500 {print}' access.log        # Show rows whose ninth field is 500 or higher.
sed -n '20,40p' app.log                   # Print lines 20 through 40.
sed 's/localhost/test-api/g' config.txt   # Replace text in output; original remains unchanged.
tr '[:lower:]' '[:upper:]' < names.txt    # Convert lowercase to uppercase.
column -t -s',' results.csv | less -S     # Align simple comma-delimited data for viewing.
diff -u expected.json actual.json         # Unified text diff.
cmp expected.bin actual.bin               # Compare binary files byte by byte.
comm -3 <(sort expected.txt) <(sort actual.txt)  # Compare two sorted lists (Bash).
```

> For quoted or multiline CSV, use a CSV-aware tool rather than `cut` or `awk`.

## 6. Permissions, Ownership & Identity

```bash
whoami                       # Show the current user.
id                           # Show user ID, group ID, and group memberships.
groups                       # Show group memberships.
ls -l script.sh              # Inspect permissions and ownership.
chmod u+x script.sh          # Add execute permission for the owner.
chmod 640 secrets.env        # Owner read/write, group read, no access for others.
chown user:group file.txt    # Change owner and group (usually requires sudo).
umask                        # Show default permission mask.
getfacl file.txt             # Show ACL permissions (if available).
sudo -l                      # Show allowed sudo commands.
```

Avoid `chmod 777`; grant only the permissions actually required.

## 7. Archives, Compression & Checksums

```bash
tar -czf logs.tar.gz logs/               # Create a gzip-compressed archive.
tar -tzf logs.tar.gz                     # List archive contents without extracting.
tar -xzf logs.tar.gz -C ./restore        # Extract into a chosen directory.
gzip large.log                           # Compress to large.log.gz.
gzip -dk large.log.gz                    # Decompress while keeping the .gz file.
zip -r reports.zip reports/              # Create a ZIP archive.
unzip -l reports.zip                     # List ZIP contents.
unzip reports.zip -d restored-reports    # Extract to a directory.
sha256sum artifact.jar                   # Generate a SHA-256 checksum.
sha256sum -c artifact.jar.sha256         # Verify against a checksum file.
```

Inspect archive contents before extraction, especially for untrusted archives.

## 8. Processes & Jobs

```bash
ps aux                                    # Snapshot of all processes.
ps -ef                                    # Full-format process list.
pgrep -af java                            # Find Java processes with full command lines.
pidof java                                # Show PIDs for a program name.
top                                       # Interactive CPU and memory view.
top -p 1234                               # Monitor one PID.
kill -TERM 1234                           # Request graceful process termination.
kill -KILL 1234                           # Force termination; use only as a last resort.
killall -TERM process-name                # Signal processes by exact program name; verify first.
jobs -l                                   # List jobs started from the current shell.
command > run.log 2>&1 &                   # Run in background and capture stdout/stderr.
nohup command > run.log 2>&1 &             # Keep running after shell logout.
wait                                      # Wait for background jobs from the current shell.
timeout 60s command                       # Stop a command after 60 seconds.
```

Before signaling a PID, verify it with `ps -fp 1234` so you do not stop the wrong process.

## 9. CPU, Memory, Disk & System Information

```bash
uname -a                                  # Kernel and architecture information.
cat /etc/os-release                       # Linux distribution details.
hostnamectl                               # Host and operating system details.
uptime                                    # Uptime and load averages.
lscpu                                     # CPU details.
free -h                                   # Memory usage in human-readable units.
vmstat 1 10                               # CPU, memory, and run-queue samples every second.
df -h                                     # Filesystem capacity and usage.
df -i                                     # Inode usage; useful when disk appears full unexpectedly.
du -sh ./reports                          # Total size of a directory.
du -xh --max-depth=1 . | sort -h          # Sizes of immediate children, sorted.
lsblk                                     # Block devices and mount points.
mount | column -t                         # Mounted filesystems.
dmesg -T | tail -n 100                    # Recent kernel messages (access may be restricted).
```

## 10. Networking & Ports

```bash
ip addr                                   # Network interfaces and addresses.
ip route                                  # Routing table and default gateway.
getent hosts api.example.com              # Resolve a host using system name services.
dig api.example.com                       # Detailed DNS query (if installed).
ping -c 4 api.example.com                 # Send four ICMP probes; ICMP may be blocked.
curl -I https://api.example.com/health    # Fetch response headers only.
curl -sS -o /dev/null -w '%{http_code}\n' https://api.example.com/health  # Status code.
ss -lntp                                  # Listening TCP ports and owning processes.
ss -ant state established                 # Established TCP connections.
nc -vz api.example.com 443                # Test TCP connectivity to port 443.
traceroute api.example.com                # Trace network path (if installed).
lsof -iTCP:8080 -sTCP:LISTEN               # Identify the process listening on TCP 8080.
```

## 11. HTTP/API Testing with `curl`

```bash
curl -sS https://api.example.com/health
curl -sS -i https://api.example.com/health                 # Include response headers.
curl -sS -X POST https://api.example.com/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"qa-user"}'

curl -sS https://api.example.com/users/42 \
  -H "Authorization: Bearer $API_TOKEN"                   # Keep secrets in environment variables.

curl -sS --fail-with-body --retry 3 --connect-timeout 5 --max-time 30 \
  https://api.example.com/health

curl -sS -o response.json -w 'status=%{http_code} total=%{time_total}s\n' \
  https://api.example.com/data

curl -sS -D headers.txt -o body.json https://api.example.com/data  # Save headers and body separately.
curl -sS -F 'file=@report.xml' https://api.example.com/upload      # Multipart file upload.
```

Avoid `curl -k`/`--insecure` except in explicitly approved test environments; it disables TLS certificate validation. Avoid putting tokens directly on the command line because shell history and process listings may expose them.

## 12. JSON, YAML & XML

```bash
jq . response.json                              # Pretty-print and validate JSON.
jq -r '.users[].id' response.json               # Extract user IDs as raw text.
jq -e '.status == "UP"' response.json           # Exit success only when the assertion is true.
jq 'map(select(.status == "FAILED"))' tests.json # Filter failed entries.
jq -S . expected.json > expected.sorted.json    # Sort JSON object keys.
yq '.service.port' config.yaml                  # Query YAML (syntax depends on yq version).
xmllint --format results.xml                    # Format and validate XML syntax.
xmllint --xpath 'string(//testsuite/@failures)' results.xml  # Extract an XML value.
```

## 13. Environment Variables & Shell Basics

```bash
env                                   # List exported environment variables.
printenv PATH                         # Print one exported variable.
export TEST_ENV=staging               # Export for child processes in this shell.
unset TEST_ENV                        # Remove a variable.
printf '%s\n' "$TEST_ENV"             # Print safely with quoting.
command -v java                       # Show which executable will run.
type curl                             # Show how the shell resolves a command.
history | tail -n 20                  # Show recent shell history; may contain sensitive data.
source ./test.env                     # Load trusted shell statements into the current shell.
```

Quote variable expansions—use `"$FILE"`, not `$FILE`—to preserve spaces and avoid unintended globbing. Do not `source` untrusted files.

## 14. Logs & Service Troubleshooting

```bash
journalctl -u my-service                           # Logs for a systemd service.
journalctl -u my-service -f                        # Follow service logs.
journalctl -u my-service --since '30 minutes ago'  # Recent service logs.
journalctl -p err..alert --since today             # High-severity logs since today.
systemctl status my-service                        # Service state and recent messages.
systemctl is-active my-service                     # Script-friendly active-state check.
systemctl list-units --type=service --state=failed # Failed services.
```

Restarting or reconfiguring a shared service changes system state; do it only with explicit authorization.

## 15. Test Execution Patterns

```bash
pytest -q                                      # Run Python tests quietly.
pytest -x -vv tests/api                        # Stop on first failure with verbose output.
pytest --junitxml=reports/pytest-results.xml   # Produce JUnit XML.
mvn test                                       # Run Maven tests.
mvn -Dtest=LoginTest test                      # Run a selected Maven test class.
./gradlew test                                 # Run Gradle tests using the wrapper.
npm test                                       # Run the package test script.
npx playwright test                            # Run Playwright tests.
npx playwright test --grep '@smoke'            # Run tests matching a tag/title pattern.
npx playwright show-report                     # Open the generated Playwright report.
```

Capture the exit status immediately:

```bash
./run-tests.sh 2>&1 | tee reports/run.log
test_status=${PIPESTATUS[0]}                    # Bash: status of run-tests.sh, not tee.
printf 'test exit code: %s\n' "$test_status"
exit "$test_status"
```

## 16. Performance & Resource Investigation

```bash
time ./run-tests.sh                             # Wall-clock, user, and system CPU time.
/usr/bin/time -v ./run-tests.sh                 # Detailed resource usage on GNU/Linux.
pidstat -p 1234 1                               # Per-process CPU samples (sysstat package).
pidstat -r -p 1234 1                            # Per-process memory/page-fault samples.
iostat -xz 1                                    # Extended disk I/O statistics.
sar -u 1 10                                     # CPU utilization samples.
sar -r 1 10                                     # Memory utilization samples.
mpstat -P ALL 1                                 # Per-CPU utilization.
ss -s                                           # Socket summary.
watch -n 2 'free -h; df -h /'                   # Refresh memory and root filesystem usage.
```

Quick HTTP timing loop for lightweight diagnostics—not a load-test substitute:

```bash
for i in {1..10}; do
  curl -sS -o /dev/null -w '%{http_code} %{time_total}\n' https://api.example.com/health
done
```

Use purpose-built tools such as k6, JMeter, Gatling, or Locust for controlled load tests. Run them only against approved targets with agreed traffic limits; accidental load against production can cause an outage.

## 17. Java/JVM Diagnostics

```bash
java -version                                  # Java runtime version.
jps -lv                                        # List JVMs and arguments (JDK tool).
jcmd 1234 VM.version                           # JVM version for a process.
jcmd 1234 VM.flags                             # Active JVM flags.
jcmd 1234 GC.heap_info                         # Heap summary.
jstack 1234 > thread-dump.txt                  # Capture a thread dump.
jmap -histo:live 1234 > heap-histogram.txt     # Live-object histogram; may pause the JVM.
```

Some JVM diagnostics can briefly pause or heavily load an application. Obtain approval before using them on shared or production systems.

## 18. Docker

```bash
docker ps                                      # Running containers.
docker ps -a                                   # All containers.
docker images                                  # Local images.
docker logs --tail 100 -f container-name       # Follow recent container logs.
docker inspect container-name                  # Detailed container metadata.
docker stats --no-stream                       # One resource-usage snapshot.
docker exec -it container-name sh              # Open a shell when the image provides one.
docker port container-name                     # Show published port mappings.
docker cp container-name:/app/logs ./logs      # Copy files out of a container.
docker compose up -d                           # Start a Compose stack.
docker compose ps                              # Show Compose services.
docker compose logs -f service-name            # Follow one service's logs.
docker compose down                            # Stop and remove the Compose stack resources.
```

Verify the Docker context with `docker context show` before changing shared environments. Commands such as `docker system prune`, volume removal, and forced container deletion can permanently remove data.

## 19. Kubernetes (`kubectl`)

```bash
kubectl config current-context                         # Verify the active cluster first.
kubectl config get-contexts                            # List configured contexts.
kubectl get pods -n test                               # List pods in a namespace.
kubectl get pods -n test -o wide                       # Include nodes and pod IPs.
kubectl describe pod pod-name -n test                  # Events and pod details.
kubectl logs pod-name -n test --tail=100               # Recent pod logs.
kubectl logs -f pod-name -n test -c container-name     # Follow one container's logs.
kubectl logs pod-name -n test --previous               # Logs from a previously crashed container.
kubectl get events -n test --sort-by=.metadata.creationTimestamp  # Ordered events.
kubectl top pods -n test                               # Pod CPU/memory (metrics server required).
kubectl exec -it pod-name -n test -- sh                # Shell in a pod container.
kubectl port-forward -n test pod/pod-name 8080:8080    # Forward a local port to a pod.
```

Always verify both context and namespace before mutating Kubernetes resources. Prefer read-only commands during investigation.

## 20. SSH & Remote File Transfer

```bash
ssh qauser@test-host                              # Connect to a remote host.
ssh -i ~/.ssh/test_key qauser@test-host           # Use a selected private key.
ssh qauser@test-host 'hostname; uptime'           # Run remote diagnostic commands.
scp report.xml qauser@test-host:/tmp/              # Copy a file to a remote host.
scp qauser@test-host:/var/log/app.log ./           # Copy a remote file locally.
rsync -av --progress reports/ qauser@test-host:/tmp/reports/  # Synchronize files.
```

Do not disable host-key checking as a convenience. Confirm unexpected host-key changes through a trusted channel.

## 21. Scheduling & Repetition

```bash
watch -n 5 'curl -sS -o /dev/null -w "%{http_code}\n" https://api.example.com/health'
while true; do date; command; sleep 10; done        # Repeat until Ctrl+C.
crontab -l                                         # List your cron entries.
```

A sample cron entry (edit with `crontab -e`):

```cron
0 2 * * * /opt/tests/run-nightly.sh >> /var/log/test-nightly.log 2>&1
```

Cron has a minimal environment: use absolute paths, set required variables explicitly, redirect output, and prevent overlapping runs when needed.

## 22. Useful Command Composition

```bash
command1 | command2                # Send stdout from command1 to command2.
command > output.txt               # Overwrite stdout destination.
command >> output.txt              # Append stdout.
command 2> errors.txt              # Redirect stderr.
command > all.log 2>&1             # Send stdout and stderr to one file.
command | tee output.txt           # Display and save output.
command1 && command2               # Run command2 only if command1 succeeds.
command1 || command2               # Run command2 only if command1 fails.
```

Be careful with `>` because it truncates the target file before the command runs.

## 23. Shell Script Skeleton for Test Automation

```bash
#!/usr/bin/env bash
set -Eeuo pipefail

readonly REPORT_DIR="${REPORT_DIR:-./reports}"
mkdir -p -- "$REPORT_DIR"

cleanup() {
  # Stop only resources created by this script.
  :
}
trap cleanup EXIT

printf 'Starting tests at %s\n' "$(date --iso-8601=seconds)"
./run-tests.sh 2>&1 | tee "$REPORT_DIR/run.log"
printf 'Tests completed at %s\n' "$(date --iso-8601=seconds)"
```

`set -Eeuo pipefail` catches many scripting errors, but it is not a substitute for explicit error handling and cleanup. Validate scripts in an isolated test environment first.

## 24. Fast QA Troubleshooting Checklist

```bash
date --iso-8601=seconds             # Confirm timestamp and timezone context.
hostname                            # Confirm the host.
whoami                              # Confirm the current identity.
pwd                                 # Confirm the working directory.
git rev-parse --short HEAD          # Confirm the tested commit (inside a Git repository).
printenv TEST_ENV                   # Confirm the selected environment.
curl -sS -i URL                     # Check endpoint response.
getent hosts HOST                   # Check name resolution.
nc -vz HOST PORT                    # Check TCP reachability.
ss -lntp                            # Check local listeners.
pgrep -af PROCESS                   # Check whether the application is running.
tail -n 200 app.log                 # Inspect recent logs.
grep -nC 5 -E 'ERROR|FATAL|Exception' app.log  # Inspect failures with context.
df -h                               # Check disk capacity.
df -i                               # Check inode capacity.
free -h                             # Check memory.
uptime                              # Check load and uptime.
```

## 25. Command Help

```bash
man grep                       # Full manual page.
grep --help                    # Concise command help.
info coreutils                 # GNU Coreutils documentation (if installed).
apropos "search files"         # Search manual-page descriptions.
help test                      # Help for a Bash built-in.
```

---

### Safety shorthand

- Verify identity, host, environment, working directory, and cluster context before acting.
- Inspect exact paths with `ls -la -- /exact/path` before copying, moving, overwriting, or deleting.
- Quote paths and variables; use `--` before path operands when supported.
- Prefer read-only diagnostics first.
- Keep secrets out of commands, logs, screenshots, reports, and shell history.
- Treat production changes, load generation, forced process termination, and recursive deletion as approval-required operations.
