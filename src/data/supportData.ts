import { Product, SupportIssue, ErrorCodeInfo, CommunityThread } from '../types/support';

export const SUPPORT_PRODUCTS: Product[] = [
  {
    id: 'windows',
    name: 'Windows',
    description: 'Windows 11, Windows 10, updates, drivers, activation, and performance',
    icon: 'windows',
    popularIssues: [
      'Fix Windows Update errors',
      'Windows 11 activation & product key',
      'Resolve blue screen (BSOD) stop codes',
      'Audio & microphone not working',
      'Find BitLocker recovery key'
    ]
  },
  {
    id: 'm365',
    name: 'Microsoft 365 & Office',
    description: 'Word, Excel, PowerPoint, Outlook, OneDrive, and subscriptions',
    icon: 'm365',
    popularIssues: [
      'Install or reinstall Microsoft 365',
      'Subscription renewal & billing',
      'Outlook not sending or receiving mail',
      'Fix Word or Excel crashing on launch'
    ]
  },
  {
    id: 'surface',
    name: 'Surface Devices',
    description: 'Surface Pro, Surface Laptop, Surface Studio, battery, and warranty',
    icon: 'surface',
    popularIssues: [
      'Surface won\'t turn on or wake from sleep',
      'Surface Diagnostic Toolkit download',
      'Surface Pen or touch screen calibration',
      'Check warranty & start hardware repair'
    ]
  },
  {
    id: 'xbox',
    name: 'Xbox & PC Gaming',
    description: 'Xbox Series X|S, Xbox app on PC, Game Pass, and game controllers',
    icon: 'xbox',
    popularIssues: [
      'Xbox app download errors on Windows 11',
      'Game controller Bluetooth disconnection',
      'Game Pass subscription issues',
      'DirectX & Graphics driver stuttering'
    ]
  },
  {
    id: 'account',
    name: 'Microsoft Account & Security',
    description: 'Password reset, two-step verification, sign-in, and privacy',
    icon: 'shield',
    popularIssues: [
      'Reset forgotten Microsoft account password',
      'Unlock suspended or blocked account',
      'Manage two-factor authenticator app',
      'Review unauthorized account charges'
    ]
  },
  {
    id: 'accessories',
    name: 'PC Accessories & Peripherals',
    description: 'Mice, ergonomic keyboards, webcams, audio headsets, and docks',
    icon: 'headphones',
    popularIssues: [
      'Bluetooth mouse or keyboard won\'t pair',
      'Microsoft Modern Webcam black screen',
      'Surface Thunderbolt 4 Dock firmware',
      'Audio stuttering on wireless headset'
    ]
  }
];

export const SUPPORT_ISSUES: SupportIssue[] = [
  {
    id: 'win-activation',
    productId: 'windows',
    title: 'Windows 11 / 10 Activation & Product Key',
    category: 'activation',
    summary: 'Fix activation error codes, reactivate after a hardware change, or troubleshoot digital license linkage.',
    commonErrorCodes: ['0x803FA067', '0xC004C003', '0x803F7001', '0x8007007B'],
    automatedTroubleshooterAvailable: true,
    troubleshooterType: 'activation',
    steps: [
      {
        title: '1. Run the Windows Activation Troubleshooter',
        description: 'Select Start > Settings > System > Activation, and then select Troubleshoot. You must be an administrator to use this option. If you recently changed hardware (like your motherboard), select "I changed hardware on this device recently".'
      },
      {
        title: '2. Check your digital license linked to Microsoft Account',
        description: 'Make sure you are signed into Windows with the same Microsoft Account that holds your digital license entitlement. Go to Settings > Accounts > Your info to verify your account status.'
      },
      {
        title: '3. Reset the Activation Token via Command Prompt',
        description: 'Open Command Prompt as Administrator and run the Windows Software Licensing Management tool to re-arm activation tokens.',
        command: 'slmgr.vbs /rearm'
      },
      {
        title: '4. Force Activation Server Verification',
        description: 'Query Microsoft KMS activation servers directly to synchronize license state.',
        command: 'slmgr.vbs /ato'
      }
    ]
  },
  {
    id: 'win-update',
    productId: 'windows',
    title: 'Windows Update Fails to Install or Freezes',
    category: 'update',
    summary: 'Troubleshoot stuck updates, error codes like 0x80070002 or 0x80240020, or update loop resets.',
    commonErrorCodes: ['0x80070002', '0x80070003', '0x80240020', '0x80070422', '0x800F0922'],
    automatedTroubleshooterAvailable: true,
    troubleshooterType: 'update',
    steps: [
      {
        title: '1. Run the Windows Update Troubleshooter',
        description: 'Select Start > Settings > System > Troubleshoot > Other troubleshooters. Next to Windows Update, select Run. The tool will check cryptographic services and background transfer.'
      },
      {
        title: '2. Run System File Checker & DISM Health Restore',
        description: 'Corrupted system files are the primary cause of update installation aborts. Open Terminal as Administrator and execute:',
        command: 'DISM.exe /Online /Cleanup-image /Restorehealth && sfc /scannow'
      },
      {
        title: '3. Clear SoftwareDistribution Cache',
        description: 'Stop the Windows Update service, purge downloaded installer caches, and restart update services cleanly.',
        command: 'net stop wuauserv && net stop bits && del /f /s /q %windir%\\SoftwareDistribution\\Download && net start wuauserv && net start bits'
      },
      {
        title: '4. Use the Windows 11 Installation Assistant',
        description: 'If cumulative update continues to fail, download the official Windows 11 Installation Assistant to perform an in-place component refresh without losing files.'
      }
    ]
  },
  {
    id: 'win-bsod',
    productId: 'windows',
    title: 'Troubleshoot Blue Screen (BSOD) & Stop Errors',
    category: 'bsod',
    summary: 'Diagnose fatal system crashes, driver page faults, memory management issues, and hardware halts.',
    commonErrorCodes: ['CRITICAL_PROCESS_DIED', 'PAGE_FAULT_IN_NONPAGED_AREA', 'KERNEL_SECURITY_CHECK_FAILURE', 'SYSTEM_SERVICE_EXCEPTION', 'DPC_WATCHDOG_VIOLATION'],
    automatedTroubleshooterAvailable: true,
    troubleshooterType: 'bsod',
    steps: [
      {
        title: '1. Analyze the Stop Code & Mini-dump',
        description: 'Look at the QR code and error text on your blue screen. Note if a specific file is mentioned (e.g., nvlddmkm.sys, ntoskrnl.exe, rt640x64.sys).'
      },
      {
        title: '2. Check Windows Memory Diagnostic Tool',
        description: 'Defective RAM or unstable XMP profiles cause frequent memory management faults. Run Windows Memory Diagnostic:',
        command: 'mdsched.exe'
      },
      {
        title: '3. Boot into Windows Safe Mode with Networking',
        description: 'Hold Shift while clicking Restart on the Windows sign-in screen. Go to Troubleshoot > Advanced options > Startup Settings > Restart, then press 5 for Safe Mode with Networking.'
      },
      {
        title: '4. Check Disk for Bad Sectors & File System Integrity',
        description: 'Execute Check Disk on your boot volume to locate and isolate filesystem corruption:',
        command: 'chkdsk C: /f /r'
      }
    ]
  },
  {
    id: 'win-audio',
    productId: 'windows',
    title: 'Fix Sound & Audio Problems in Windows',
    category: 'audio',
    summary: 'No sound output, distorted speakers, microphone not detecting voice, or HDMI audio dropouts.',
    commonErrorCodes: ['0x80070005 (Audio Service)', 'Audio Services Not Responding'],
    automatedTroubleshooterAvailable: true,
    troubleshooterType: 'audio',
    steps: [
      {
        title: '1. Verify Default Audio Endpoint',
        description: 'Select the Sound icon on the taskbar, then click the Manage Audio Devices arrow. Confirm your desired speakers or headphones are selected as default.'
      },
      {
        title: '2. Restart Windows Audio Service & Endpoint Builder',
        description: 'Restart the underlying Windows Audio daemon via elevated command line:',
        command: 'net stop Audiosrv && net stop AudioEndpointBuilder && net start Audiosrv && net start AudioEndpointBuilder'
      },
      {
        title: '3. Roll Back or Reinstall High Definition Audio Driver',
        description: 'Press Win + X > Device Manager > Sound, video and game controllers. Right-click your audio chip (Realtek or Intel High Definition Audio) and choose "Update driver" > "Browse my computer for drivers" > "Let me pick from a list of available drivers on my computer".'
      },
      {
        title: '4. Disable Audio Enhancements (Exclusive Mode)',
        description: 'Go to Settings > System > Sound > More sound settings. Under Playback, double-click your output device, switch to Advanced tab, and uncheck "Enable audio enhancements".'
      }
    ]
  },
  {
    id: 'win-bitlocker',
    productId: 'windows',
    title: 'Find Your BitLocker Recovery Key',
    category: 'recovery',
    summary: 'Unlock your encrypted Windows drive if prompted during boot after BIOS/firmware update or hardware replacement.',
    commonErrorCodes: ['BitLocker Prompt on Boot'],
    automatedTroubleshooterAvailable: true,
    troubleshooterType: 'bitlocker',
    steps: [
      {
        title: '1. Access Microsoft Account Key Portal',
        description: 'On a mobile device or another computer, open your web browser and go directly to account.microsoft.com/devices/recoverykey. Sign in with the exact Microsoft Account linked to your PC.'
      },
      {
        title: '2. Match Key ID and Recovery Key',
        description: 'Compare the first 8 characters of the Recovery Key ID shown on your blue BitLocker screen with the IDs listed on your Microsoft Account recovery page. Type in the 48-digit numerical key.'
      },
      {
        title: '3. Check Work or School Azure AD Account',
        description: 'If this PC was set up with an organization email, access portal.azure.com or myaccount.microsoft.com with your work credentials and view Devices > BitLocker Keys.'
      }
    ]
  },
  {
    id: 'surface-power',
    productId: 'surface',
    title: 'Surface Won\'t Turn On, Charge, or Start Windows',
    category: 'surface',
    summary: 'Hardware diagnostic steps for Surface Pro, Surface Laptop, or Surface Studio power issues.',
    commonErrorCodes: ['Flashing Surface Logo', 'No Power LED'],
    automatedTroubleshooterAvailable: true,
    troubleshooterType: 'surface',
    steps: [
      {
        title: '1. Check the Power Supply LED',
        description: 'Check the tip of your Surface Connect charger. If the LED is off or blinking, unplug from wall for 10 seconds, clean the magnetic pins with a dry cloth, and plug back in.'
      },
      {
        title: '2. Force a Hard Reset / Two-Button Restart',
        description: 'Press and hold the Power button down continuously for full 20 to 30 seconds until the Windows/Surface logo flashes twice, then release.'
      },
      {
        title: '3. Wake with Keyboard Shortcut',
        description: 'If connected to a keyboard, simultaneously press the Windows logo key + Ctrl + Shift + B. This wakes the graphics subsystem without restarting the operating system.'
      },
      {
        title: '4. Run Surface Diagnostic Toolkit',
        description: 'Once booted, download and execute the official Surface Diagnostic Toolkit to check touchscreen digitizer, battery cell health, and UEFI firmware integrity.'
      }
    ]
  }
];

export const ERROR_CODES_DB: ErrorCodeInfo[] = [
  {
    code: '0x803FA067',
    name: 'Activation Upgrade Mismatch',
    category: 'Windows Activation',
    description: 'Occurs when upgrading from Windows Home to Windows Pro or after replacing motherboard components without transferring digital entitlement.',
    commonCauses: ['Server cannot validate OEM key', 'Hardware change detected', 'Upgrading without internet connection'],
    recommendedFix: 'Disconnect internet temporarily, enter default Windows Pro generic key (VK7JG-NPHTM-C97JM-9MPGT-3V66T) to trigger edition upgrade, restart, reconnect to internet, and activate with your authentic digital license.',
    powershellFix: 'slmgr.vbs -ipk VK7JG-NPHTM-C97JM-9MPGT-3V66T'
  },
  {
    code: '0x80070002',
    name: 'ERROR_FILE_NOT_FOUND in Windows Update',
    category: 'Windows Update',
    description: 'Windows Update cannot locate downloaded installation packages because files were partially downloaded or corrupted in the temporary directory.',
    commonCauses: ['Incomplete package download', 'Third-party antivirus lock', 'Corrupted SoftwareDistribution folder'],
    recommendedFix: 'Stop Windows Update service, delete files in C:\\Windows\\SoftwareDistribution\\Download, and re-run update check.',
    powershellFix: 'Stop-Service wuauserv; Remove-Item -Path "C:\\Windows\\SoftwareDistribution\\Download\\*" -Recurse -Force; Start-Service wuauserv'
  },
  {
    code: '0x80070005',
    name: 'Access Denied / Security Descriptor Error',
    category: 'Windows Permissions & Store',
    description: 'System process lacks administrative permission to write critical registry keys or file system sectors.',
    commonCauses: ['Missing Administrator rights', 'Corrupted registry permissions', 'Third-party security software interference'],
    recommendedFix: 'Run the Command Prompt or installation setup explicitly as Administrator, or repair registry ACLs with SubInACL.',
    powershellFix: 'Start-Process cmd -Verb RunAs'
  },
  {
    code: '0x80240020',
    name: 'Windows Update Download State Timeout',
    category: 'Windows Update',
    description: 'An update requires user interaction or failed verification of internal digital signatures.',
    commonCauses: ['Network packet loss during delta download', 'Expired certificate chain in local root store'],
    recommendedFix: 'Run DISM online repair command to restore the component store, then initiate manual scan.',
    powershellFix: 'dism.exe /online /cleanup-image /restorehealth; UsoClient StartScan'
  },
  {
    code: 'PAGE_FAULT_IN_NONPAGED_AREA',
    name: 'Stop Code 0x00000050',
    category: 'Blue Screen of Death (BSOD)',
    description: 'Invalid system memory referenced. System tried to access non-existent memory address or page file was corrupted.',
    commonCauses: ['Faulty RAM module', 'Outdated graphics/network driver', 'Damaged hard drive sectors'],
    recommendedFix: 'Run Windows Memory Diagnostic (mdsched.exe) to test RAM, update GPU drivers, and check disk with chkdsk C: /f.',
    powershellFix: 'chkdsk C: /f /r'
  },
  {
    code: 'CRITICAL_PROCESS_DIED',
    name: 'Stop Code 0x000000EF',
    category: 'Blue Screen of Death (BSOD)',
    description: 'A critical Windows kernel process (such as csrss.exe, wininit.exe, or svchost.exe) ended unexpectedly.',
    commonCauses: ['System file corruption', 'Malicious software altering system binaries', 'Bad storage SSD driver'],
    recommendedFix: 'Boot into Windows Recovery Environment, open Command Prompt, and run System File Checker offline repair.',
    powershellFix: 'sfc /scannow'
  },
  {
    code: '0x0000011b',
    name: 'Network Printer RPC Authentication Failure',
    category: 'Devices & Printing',
    description: 'Windows blocks shared network printing connections following security hardening patches for PrintNightmare.',
    commonCauses: ['RPC AuthN level mismatch between Windows client and print server'],
    recommendedFix: 'Set RpcAuthnLevelPrivacyEnabled registry value to 0 on the print sharing host computer.',
    powershellFix: 'reg add "HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\Print" /v RpcAuthnLevelPrivacyEnabled /t REG_DWORD /d 0 /f'
  }
];

export const COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: 'comm-1',
    title: 'Windows 11 version 24H2 cumulative update failed with error 0x800f0922',
    author: 'DaveM121',
    authorBadge: 'Microsoft MVP',
    date: 'Yesterday',
    views: 14200,
    repliesCount: 48,
    hasVerifiedAnswer: true,
    snippet: 'This error commonly occurs when the EFI System Partition (ESP) has less than 50MB free space or Secure Boot key validation needs reset...',
    solution: 'Free up space in the EFI partition by mounting it via diskpart and removing old temporary font files, or temporarily disable third-party VPN software prior to restarting.'
  },
  {
    id: 'comm-2',
    title: 'No audio after sleep mode on Windows 11 - Realtek High Definition Audio',
    author: 'Kapil Arya',
    authorBadge: 'Microsoft MVP',
    date: '3 days ago',
    views: 8930,
    repliesCount: 29,
    hasVerifiedAnswer: true,
    snippet: 'Every time my laptop wakes from sleep or modern standby, the speaker icon has a red cross...',
    solution: 'In Device Manager, open Properties of Realtek Audio > Power Management tab, and uncheck "Allow the computer to turn off this device to save power".'
  },
  {
    id: 'comm-3',
    title: 'Replaced Motherboard & CPU, Windows 11 says digital license not active',
    author: 'Andre Da Costa',
    authorBadge: 'Windows Insider MVP',
    date: '5 days ago',
    views: 21500,
    repliesCount: 63,
    hasVerifiedAnswer: true,
    snippet: 'If you have a Retail Windows license tied to your Microsoft Account, you can transfer it to your new build...',
    solution: 'Go to Settings > System > Activation > Troubleshoot > "I changed hardware on this device recently". Select your old machine name from the list and click "Activate".'
  }
];

export const SERVICE_STATUS_ITEMS = [
  { name: 'Windows Update Services', status: 'Healthy', latency: '42ms' },
  { name: 'Microsoft Account Authentication', status: 'Healthy', latency: '28ms' },
  { name: 'Windows Store & App Installer', status: 'Healthy', latency: '35ms' },
  { name: 'Surface Hardware Repair Service', status: 'Operating Normally', latency: 'Normal' },
  { name: 'Microsoft 365 Activation Cloud', status: 'Healthy', latency: '31ms' }
];
