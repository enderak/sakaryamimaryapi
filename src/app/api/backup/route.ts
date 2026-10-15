import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import {
  getAllBackups,
  createSiteBackup,
  restoreSiteBackup,
  undoLastChange,
  deleteSiteBackup,
  resetAllSiteConfigsToDefault,
  importSiteBackup
} from "@/lib/backupStorage";

export async function GET() {
  try {
    const backups = getAllBackups();
    return NextResponse.json(
      { success: true, backups },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
        }
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Yedekler alınamadı.", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz işlem. Lütfen giriş yapınız." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const action = body.action;

    // 1. CREATE MANUAL / AUTO BACKUP
    if (action === "create") {
      const backup = createSiteBackup(body.title, body.description, body.type || "manual");
      return NextResponse.json({
        success: true,
        message: `"${backup.title}" başarıyla oluşturuldu ve güvenle saklandı.`,
        backup,
        backups: getAllBackups()
      });
    }

    // 2. RESTORE FROM BACKUP
    if (action === "restore") {
      if (!body.backupId) {
        return NextResponse.json(
          { success: false, message: "Geri yüklenecek yedek ID'si belirtilmedi." },
          { status: 400 }
        );
      }
      const result = restoreSiteBackup(body.backupId);
      if (!result.success) {
        return NextResponse.json(result, { status: 400 });
      }
      return NextResponse.json({
        ...result,
        backups: getAllBackups()
      });
    }

    // 3. UNDO LAST CHANGE
    if (action === "undo") {
      const result = undoLastChange();
      if (!result.success) {
        return NextResponse.json(result, { status: 400 });
      }
      return NextResponse.json({
        ...result,
        backups: getAllBackups()
      });
    }

    // 4. DELETE A BACKUP
    if (action === "delete") {
      if (!body.backupId) {
        return NextResponse.json(
          { success: false, message: "Silinecek yedek ID'si belirtilmedi." },
          { status: 400 }
        );
      }
      const deleted = deleteSiteBackup(body.backupId);
      if (!deleted) {
        return NextResponse.json(
          { success: false, message: "Yedek silinemedi veya bulunamadı." },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "Yedek kaydı başarıyla silindi.",
        backups: getAllBackups()
      });
    }

    // 5. RESET ALL TO FACTORY DEFAULTS
    if (action === "reset_all") {
      const result = resetAllSiteConfigsToDefault();
      return NextResponse.json({
        ...result,
        backups: getAllBackups()
      });
    }

    // 6. IMPORT EXTERNAL JSON BACKUP
    if (action === "import") {
      if (!body.importedJson) {
        return NextResponse.json(
          { success: false, message: "İçe aktarılacak dosya verisi bulunamadı." },
          { status: 400 }
        );
      }
      const result = importSiteBackup(body.importedJson);
      if (!result.success) {
        return NextResponse.json(result, { status: 400 });
      }
      return NextResponse.json({
        ...result,
        backups: getAllBackups()
      });
    }

    return NextResponse.json(
      { success: false, message: "Geçersiz işlem parametresi." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Backup POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Yedekleme işlemi sırasında bir sunucu hatası meydana geldi.",
        error: String(error)
      },
      { status: 500 }
    );
  }
}
